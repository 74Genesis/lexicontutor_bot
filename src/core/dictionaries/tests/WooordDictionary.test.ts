import WooordDictionary from '../WooordDictionary';
import test from 'ava';
import { wooordProficiency } from './mocks/dictionaries';

//TODO: mock responses, test exceptions

test('success parse: take off', async (t) => {
  let dict = new WooordDictionary();
  const card = await dict.parse('proficiency');

  t.deepEqual(wooordProficiency, card);
});

test('not found word', async (t) => {
  let dict = new WooordDictionary();
  const card = await dict.parse('asdf');

  t.deepEqual({ entry: 'asdf', response: [] }, card);
});
