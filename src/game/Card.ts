export default class Card {
  public front: string = '';
  public back: string = '';

  public factor: number = 2500;

  public ivl: number = 0;
  // interval (used in SRS algorithm). Negative = seconds, positive = days

  public type: number = 0;
  // 0=new, 1=learning, 2=review, 3=relearning

  public queue: number = 0;
  // -3=user buried(In scheduler 2),
  // -2=sched buried (In scheduler 2),
  // -2=buried(In scheduler 1),
  // -1=suspended,
  // 0=new, 1=learning, 2=review (as for type)
  // 3=in learning, next rev in at least a day after the previous review
  // 4=preview

  public due: number = 0;
  // Due is used differently for different card types:
  // new: note id or random int
  // due: integer day, relative to the collection's creation time
  // learning: integer timestamp in second

  public reps: number = 0;
  public lapses: number = 0;

  public left: number = 0;
  // of the form a*1000+b, with:
  // a the number of reps left today
  // b the number of reps left till graduation
  // for example: '2004' means 2 reps left today and 4 reps till graduation

  constructor(options: Record<string, any>) {
    this.front = options?.front;
    this.back = options?.back;
  }

  // again() {}
  // easy() {}
  // medium() {}
  // hard() {}
}
