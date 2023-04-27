import WooordDictionary from '../WooordDictionary';
import test from 'ava';
import { cambridgeTakeOff } from './mocks/dictionaries';

//TODO: mock responses, test exceptions

test('success parse: take off', async (t) => {
  let dict = new WooordDictionary();
  const card = await dict.parse('proficiency');
  console.log(card);
  // t.deepEqual(cambridgeTakeOff, card);
});

test('not found word', async (t) => {
  let dict = new WooordDictionary();
  const card = await dict.parse('asdf');

  t.deepEqual({ entry: 'asdf', response: [] }, card);
});
