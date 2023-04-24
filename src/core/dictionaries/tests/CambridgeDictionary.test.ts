import CambrdgeDictionary from '../CambridgeDictionary';
import WooordDictionary from '../WooordDictionary';
import test from 'ava';

test('Decks parsing result', async (t) => {
  //   let dict = new CambrdgeDictionary();
  //   console.log(await dict.parse('armor'));
  const dict2 = new WooordDictionary();
  console.log(await dict2.parse('armor'));
});
