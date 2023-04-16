import test from 'ava';
import parser from 'apkg-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('foo', async (t) => {
  const p = new parser({
    tempFilesPath: __dirname + '/temp/',
  });
  console.log(p.getAnkiCards(__dirname + '/deck_media.apkg'));
  // console.log(parser);
  t.pass();
});
