import { type ParsedData } from './Dictionary';
import Dictionary from './Dictionary';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default class CambrdgeDictionary extends Dictionary {
  async parse(payload: string): Promise<ParsedData> {
    const url = this.getUrl(payload);
    const response = await axios.get(url);
    // console.log(Object.keys(response));
    const html = response.data;
    const $ = cheerio.load(html || '');

    console.log($('.headword').html());
    return { entry: '', response: [] };
  }

  private getUrl(payload: string): string {
    const phrase = payload
      .trim()
      .replace(/[^a-zA-Z0-9\- ]/g, '')
      .replace(' ', '-');
    return `https://dictionary.cambridge.org/dictionary/english/${phrase}`;
  }
}
