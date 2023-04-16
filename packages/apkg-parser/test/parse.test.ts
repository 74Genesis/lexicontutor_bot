import test from 'ava';
import parser from 'apkg-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { decks_nomedia } from './mocks/decks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('Decks parsing result', async (t) => {
  const p = new parser({
    tempFilesPath: __dirname + '/temp/',
  });
  let decks = p.getAnkiCards(__dirname + '/deck_nomedia.apkg');
  console.log(decks);
  // t.deepEqual(decks, decks_nomedia);

  decks = p.getAnkiCards(__dirname + '/deck_media.apkg');
  // t.deepEqual(decks, decks_nomedia);
});
