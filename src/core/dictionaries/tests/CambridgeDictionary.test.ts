import CambrdgeDictionary from '../CambridgeDictionary';
import WooordDictionary from '../WooordDictionary';
import test from 'ava';
import { cambridgeTakeOff } from './mocks/dictionaries';

//TODO: mock responses, test exceptions

// test('success parse: take off', async (t) => {
//   let dict = new CambrdgeDictionary();
//   const card = await dict.parse('take off');

//   t.deepEqual(cambridgeTakeOff, card);
// });

// test('not found word', async (t) => {
//   let dict = new CambrdgeDictionary();
//   const card = await dict.parse('123');

//   t.deepEqual({ entry: '123', response: [] }, card);
// });
