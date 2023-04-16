export interface Note {
  id: number;
  guid: number;
  // mid: number;
  mod: number;
  usn: number;
  tags: string;
  flds: string;
  sfld: number;
  // csum:number;
}
export interface Deck {
  name: string;
  // extendRev: number;
  // usn: number;
  collapsed: boolean;
  // browserCollapsed: boolean;
  // dyn:number;
  // extendNew: any;
  // conf: number;
  id: number;
  mod: number;
  desc: string;
}

//TODO: expand class with full data of card
/**
 * Anki card class - denormolized, includes additional information from other tables
 * You can see original database structure here: https://github.com/ankidroid/Anki-Android/wiki/Database-Structure
 */
export default class Card {
  id: number;
  nid?: Note; // note object
  did?: Deck; // deck object
  // ord: number;
  mod: number;
  // usn: string;
  type: number;
  // queue: number;
  // due: number;
  ivl: number;
  factor: number;
  reps: number;
  lapses: number;
  left: number;
  // odue: number;
  // odid: number;
  // flags: number

  constructor(card: Card) {
    this.id = card.id;
    this.nid = card.nid;
    this.did = card.did;
    this.mod = card.mod;
    this.type = card.type;
    this.ivl = card.ivl;
    this.factor = card.factor;
    this.reps = card.reps;
    this.lapses = card.lapses;
    this.left = card.left;
  }
}
