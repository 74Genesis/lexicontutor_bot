import Collection form './collection'

export default class UserCollection extends Collection {
  public id: string;
  public name: string;
  public decks: Record<string, any>[];
}
