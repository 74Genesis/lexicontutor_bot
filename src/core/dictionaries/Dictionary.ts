import { CONSTANT } from './../../constants';

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
}
