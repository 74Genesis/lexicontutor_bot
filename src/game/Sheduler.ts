import Card from './Card';

const NEW_CARDS_DISTRIBUTE = 0;
const NEW_CARDS_LAST = 1;
const NEW_CARDS_FIRST = 2;

const STARTING_FACTOR = 2500;

const DECK_CONF = {
  new: {
    delays: [1, 10],
    ints: [1, 4],
    initialFactor: STARTING_FACTOR,
    perDay: 20,
  },
  lapse: {
    delays: [10],
    mult: 0,
    minInt: 1,
    leechFails: 8,
  },
  rev: {
    perDay: 200,
    ease4: 1.3,
    ivlFct: 1,
    maxIvl: 36500,
    hardFactor: 1.2,
  },
};

export default class Sheduler {
  public colleсtion: Record<string, any>[] = [];

  constructor() {}
  getCard() {}
  answere(card: Card, ease: number = 1) {
    card.reps++;

    // move new cards to "learning" queue and change type
    if (card.queue === 0) {
      card.queue = 1; //learning
      card.type = 1; //learning

      //add number of repetitions
      card.left = this.startingLeft(card);
    }

    if ([1, 3].includes(card.queue)) {
      this.learnCard(card);
    }

    if (card.queue === 2) {
      this.reviewCard(card);
    }

    //   def answerCard(self, card, ease):
    // assert 1 <= ease <= 4
    // assert 0 <= card.queue <= 4
    // card.reps += 1
    // if card.queue == 0:
    //     # came from the new queue, move to learning
    //     card.queue = 1
    //     card.type = 1
    //     # init reps to graduation
    //     card.left = self._startingLeft(card)
    // if card.queue in [1, 3]:
    //     self._answerLrnCard(card, ease)
    // elif card.queue == 2:
    //     self._answerRevCard(card, ease)
    // else:
    //     assert 0
  }

  private startingLeft(card: Card): number {
    const conf = this.getConf(card);

    const left = 

    // conf = self._lrnConf(card);
    // tot = len(conf['delays']);
    // tod = self._leftToday(conf['delays'], tot);
    // return tot + tod * 1000;
  }

  private getConf(card: Card) {
    if ([2, 3].includes(card.type)) {
      return DECK_CONF.lapse;
    } else {
      return DECK_CONF.new;
    }
  }

  private learnCard(card: Card) {
    return 0;
  }
  private reviewCard(card: Card) {
    return 0;
  }
}
