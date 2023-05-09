export default class Card {
  public front: string = '';
  public back: string = '';
  constructor(options: Record<string, any>) {
    this.front = options?.front;
    this.back = options?.back;
  }

  easy() {}
  medium() {}
  hard() {}
  toohard() {}
}
