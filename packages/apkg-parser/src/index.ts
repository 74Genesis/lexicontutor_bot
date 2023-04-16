import * as fs from 'fs';
import Zip from 'node-zip';
import * as crypto from 'crypto';
import * as path from 'path';
import tableConverter from './tableConverter.js';
import Card, { Note, Deck } from './card.js';

const _deckName = 'collection.anki21';

interface Config {
  tempFilesPath?: string;
}

// TODO: save errors to log

export default class ApkgParser {
  private config: Config;
  private deckDirName: string;

  constructor(config: Config) {
    this.config = Object.assign(
      {
        tempFilesPath: './temp/',
      },
      config,
    );
    this.deckDirName = crypto.randomBytes(16).toString('hex');
  }

  /**
   * Returns all cards from collection, with additional denormolized information
   * @param file anki database path. apkg/colpkg extensions supported
   */
  getAnkiCards(file: string): Card[] {
    const name: string = file.split('/').pop().split('.')[0];
    const zip: Zip = this.getZip(file);
    const media: Object = JSON.parse(zip.files.media._data);

    this.createTempDir();

    for (const key in zip.files) {
      const file = zip.files[key];
      if (file.name === _deckName) {
        fs.writeFileSync(this.getDeckPath(), file._data, { encoding: 'binary' });
      }
    }

    const tables = this.tablesToJson(['col', 'notes', 'cards', 'revlog', 'graves']);

    const notes = this.parseCards(tables);

    this.removeTempDir();

    return notes;
  }

  /**
   * Converts sqlite tables to json format
   * @param tables list of tables
   */
  private tablesToJson(tables: string[]): Record<string, Object[]> {
    const res = {};
    try {
      for (let i = 0; i < tables.length; i++) {
        console.log('TABLE: ', tables[i]);
        const tablejson = tableConverter(this.getDeckPath(), tables[i]);
        res[tables[i]] = !!tablejson.trim() ? JSON.parse(tablejson) : [];
      }
    } catch (e) {
      throw new Error('Fail to convert tables to json: ' + e.message);
    }
    return res;
  }

  /**
   * Returns all cards finded in database
   * @param tables anki db tables in json format
   */
  private parseCards(tables: Record<string, Record<string, any>[]>): Card[] {
    try {
      const notes: Card[] = [];
      for (let i = 0; i < tables?.cards?.length; i++) {
        const c = new Card({
          id: +tables?.cards?.[i]?.id,
          mod: +tables?.cards?.[i]?.mod,
          type: tables?.cards?.[i]?.type,
          ivl: +tables?.cards?.[i]?.ivl,
          factor: +tables?.cards?.[i]?.factor,
          reps: +tables?.cards?.[i]?.reps,
          lapses: +tables?.cards?.[i]?.lapses,
          left: +tables?.cards?.[i]?.left,
        });

        // add card's Note info
        for (let j = 0; j < tables?.notes?.length; j++) {
          if (tables?.cards[i]?.nid === tables?.notes[j]?.id) {
            c.nid = {
              id: tables?.notes?.[j].id,
              guid: tables?.notes?.[j].guid,
              mod: tables?.notes?.[j].mod,
              usn: tables?.notes?.[j].usn,
              tags: tables?.notes?.[j].tags,
              flds: tables?.notes?.[j].flds,
              sfld: tables?.notes?.[j].sfld,
            };
          }
        }

        // add card's Deck info
        for (let k = 0; k < tables?.col?.length; k++) {
          const decks = JSON.parse(tables?.col?.[k]?.decks || '{}');
          if (decks[tables?.cards[i]?.did]) {
            const deck = decks[tables?.cards[i]?.did];
            c.did = {
              name: deck?.name,
              collapsed: deck?.collapsed,
              id: deck?.id,
              mod: deck?.mod,
              desc: deck?.desc,
            };
          }
        }
        notes.push(c);
      }
      return notes;
    } catch (e) {
      throw new Error('Fail to parse anki cards: ' + e?.message);
    }
  }

  /**
   * Returns zip instance for anki collection
   * @param file path to anki collection file
   */
  private getZip(file: string): Zip {
    try {
      return new Zip(fs.readFileSync(file), { base64: false, checkCRC32: true });
    } catch (e) {
      throw new Error('Fail create zip: ' + e?.message);
    }
  }

  /**
   * Creates temporary dir to unpack anki collection and parse database
   */
  private createTempDir() {
    try {
      const p = this.getTempDir();
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true });
      }
    } catch (e) {
      throw new Error('Fail to create temporary deck folder: ' + e?.message);
    }
  }

  /**
   * Remove temporary dir used for unpack collection
   */
  private removeTempDir() {
    try {
      const p = this.getTempDir();
      if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
    } catch (e) {
      throw new Error('Fail to remove temporary deck folder: ' + e?.message);
    }
  }

  /**
   * Temp dir path
   */
  private getTempDir() {
    return path.join(this.config.tempFilesPath, this.deckDirName);
  }

  /**
   * Deck path
   */
  private getDeckPath() {
    return path.join(this.getTempDir(), _deckName);
  }
}
