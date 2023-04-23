import CambrdgeDictionary from '../CambridgeDictionary';
import test from 'ava';

test('Decks parsing result', async (t) => {
  const dict = new CambrdgeDictionary();
  console.log(await dict.parse('speed'));
});
