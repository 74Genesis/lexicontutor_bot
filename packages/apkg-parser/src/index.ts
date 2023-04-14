import * as fs from 'fs';
import Zip from 'node-zip';
import sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();
import * as crypto from 'crypto';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tableConverter from './tableConverter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Config {
  tempFilesPath?: string;
}

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

  async deckToJson(file: string) {
    const name: string = file.split('/').pop().split('.')[0];
    const zip: Zip = this.getZip(file);
    const media: Object = JSON.parse(zip.files.media._data);

    this.createTempDir();

    for (const key in zip.files) {
      const file = zip.files[key];
      if (['collection.anki2', 'collection.anki21'].includes(file.name)) {
        fs.writeFileSync(this.getDeckPath(), file._data, { encoding: 'binary' });
      }
    }

    try {
      console.log(this.getDeckPath());
      sqlite3.verbose();
      const db = new sqlite3.Database(this.getDeckPath(), sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message, this.getDeckPath());
        }
        console.log('Connected to the database.');
        try {
          db.exec('SELECT * from notes', (res) => {
            console.log(res);
          });
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }

    // this.removeTempDir();
  }

  private getZip(file: string): Zip {
    try {
      return new Zip(fs.readFileSync(file), { base64: false, checkCRC32: true });
    } catch (e) {
      throw new Error('Fail create zip: ' + e?.message);
    }
  }

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

  private removeTempDir() {
    try {
      const p = this.getTempDir();
      if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
    } catch (e) {
      throw new Error('Fail to remove temporary deck folder: ' + e?.message);
    }
  }

  private getTempDir() {
    return path.join(this.config.tempFilesPath, this.deckDirName);
  }
  private getDeckPath() {
    return path.join(this.getTempDir(), _deckName);
  }
}
