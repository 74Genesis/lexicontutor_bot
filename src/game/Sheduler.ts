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
  public queueLimit: number = 50;
  public reportLimit: number = 1000;
  public reps: number = 0;
  public today: number = 0;
  public _dayCutoff: number = 0;
  public _lrnCutoff: number = 0;

  constructor(col) {
    this.colleсtion = col;
    this.reset();
  }

  private reset() {
    this.updateCutoff();
    this.resetLrn();
    this.resetRev();
    this.resetNew();
  }

  //   def _updateCutoff(self):
  //     # days since col created
  //     self.today = self._daysSinceCreation()
  //     # end of day cutoff
  //     self.dayCutoff = self._dayCutoff()

  // def _checkDay(self):
  //     # check if the day has rolled over
  //     if time.time() > self.dayCutoff:
  //         self.reset()

  // def _dayCutoff(self):
  //     date = datetime.datetime.today()
  //     date = date.replace(hour=0, minute=0, second=0, microsecond=0)
  //     if date < datetime.datetime.today():
  //         date = date + datetime.timedelta(days=1)
  //     stamp = int(time.mktime(date.timetuple()))
  //     return stamp

  // def _daysSinceCreation(self):
  //     startDate = datetime.datetime.fromtimestamp(self.col.crt)
  //     return int((time.time() - time.mktime(startDate.timetuple())) // 86400)

  // def _updateLrnCutoff(self, force):
  //     nextCutoff = intTime() + self.col.colConf['collapseTime']
  //     if nextCutoff - self._lrnCutoff > 60 or force:
  //         self._lrnCutoff = nextCutoff
  //         return True
  //     return False

  // def _maybeResetLrn(self, force):
  //     if self._updateLrnCutoff(force):
  //         self._resetLrn()

  // def _resetLrn(self):
  //     self._updateLrnCutoff(force=True)
  //     self._lrnQueue = []

  public getCard() {}
  public answere(card: Card, ease: number = 1) {
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

    const left = this.leftToday(conf.delays, conf.delays.length);
    return left * 1000 + conf.delays.length;

    // conf = self._lrnConf(card);
    // tot = len(conf['delays']);
    // tod = self._leftToday(conf['delays'], tot);
    // return tot + tod * 1000;
  }
  private leftToday(delays: number[], count: number, now = new Date()): number {
    //   def _leftToday(self, delays, left, now=None):
    // "The number of steps that can be completed by the day cutoff."
    // if not now:
    //     now = intTime()
    // delays = delays[-left:]
    // ok = 0
    // for i in range(len(delays)):
    //     now += delays[i]*60
    //     if now > self.dayCutoff:
    //         break
    //     ok = i
    // return ok+1
    return 0;
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
