import test from 'ava';
import parser from 'apkg-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { new_deck, legacy_deck } from './mocks/decks.js';
import Card from '../src/card.js';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO: test different functions, temp files, exceptions

test('Decks parsing result', async (t) => {
  const p = new parser({
    tempFilesPath: __dirname + '/temp/',
  });

  let cards = await p.getAnkiCards(__dirname + '/new_deck.apkg');
  for (let i = 0; i < cards.length; i++) {
    t.deepEqual(cards[i], new Card(new_deck[i]));
  }

  cards = await p.getAnkiCards(__dirname + '/legacy_deck.apkg');
  for (let i = 0; i < cards.length; i++) {
    t.deepEqual(cards[i], new Card(legacy_deck[i]));
  }
});
