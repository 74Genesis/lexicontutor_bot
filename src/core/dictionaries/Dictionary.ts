import { CONSTANT } from './../../constants';

//TODO: make format of returning data more free and flexible for different dictionaries

type Directions = keyof typeof CONSTANT.TRANSLATE_DIRECTION; //  "name" | "age"

interface DictionaryOptions {
  direction?: Directions;
}

export type ParsedData = {
  entry: string;
  response: Array<{
    word: string; // variant of word suggested by dictionary
    type: string; // part of speech, verb, noun etc.
    translation: string; // main translation
    translations: string[]; // additional translations
    examples: string[]; // examples of usage
  }>;
};

export default class Dictionary {
  private direction: string = CONSTANT.TRANSLATE_DIRECTION.EN_RU;

  constructor(options: DictionaryOptions = {}) {
    if (options.direction) this.direction = options.direction;
  }
  async parse(payload: string): Promise<ParsedData> {
    return { entry: '', response: [] };
  }
  clearText(payload: string): string {
    return payload
      .replace(/&nbsp;/g, ' ')
      .replace(/\u00A0/g, ' ')
      .replace(/&ensp;/g, ' ')
      .replace(/\u2002/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[^a-zA-Zа-яё0-9\-!@#$%^&*,.;()— ]/g, '');
  }
}
