import { type ParsedData } from './Dictionary';
import Dictionary from './Dictionary';
import axios from 'axios';
import * as cheerio from 'cheerio';
import type { Element, CheerioAPI } from 'cheerio';

export default class CambrdgeDictionary extends Dictionary {
  private $: CheerioAPI = cheerio.load('');

  async parse(payload: string): Promise<ParsedData> {
    const variants = [];

    try {
      const url = this.getUrl(payload);
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        },
      });
      const html = response.data;
      this.$ = cheerio.load(html || '');

      const wordWrappers = this.$('.entry-body__el');
      for (let i = 0; i < wordWrappers.length; i++) {
        const meaning = {
          word: this.getWord(wordWrappers[i]),
          type: this.getType(wordWrappers[i]),
          translation: this.getTranslation(wordWrappers[i]),
          translations: this.getTranslations(wordWrappers[i]),
          examples: this.getExamples(wordWrappers[i]),
        };
        variants.push(meaning);
      }
    } catch (e) {
      console.error('Fail parse from dictionary: ', e?.message);
    }

    return { entry: payload, response: variants };
  }

  private getWord(wrapper: Element): string {
    try {
      return this.$(wrapper).find('.headword').eq(0).text() || '';
    } catch (e) {
      console.error(e?.message);
    }
    return '';
  }

  private getType(wrapper: Element): string {
    try {
      return this.$(wrapper).find('.dpos').eq(0).text() || '';
    } catch (e) {
      console.error(e?.message);
    }
    return '';
  }
  private getTranslation(wrapper: Element): string {
    try {
      const variants = this.$(wrapper).find('.dsense');
      const res: string[] = [];
      for (let i = 0; i < variants.length; i++) {
        const translate = this.clearText(this.$(variants[i]).find('.trans').eq(0).text().trim());
        res.push(translate);
      }
      return res.join(', ');
    } catch (e) {
      console.error(e?.message);
    }
    return '';
  }
  private getTranslations(wrapper: Element): string[] {
    try {
      const variants = this.$(wrapper).find('.dsense');
      const res: string[] = [];
      for (let i = 0; i < variants.length; i++) {
        const context = this.clearText(this.$(variants[i]).find('.dsense_h').eq(0).text().trim());
        const explain = this.clearText(this.$(variants[i]).find('.ddef_d').eq(0).text().trim());
        const translate = this.clearText(this.$(variants[i]).find('.trans').eq(0).text().trim());
        res.push(`${translate}: ${explain} ${context}`);
      }
      return res;
    } catch (e) {
      console.error(e?.message);
    }
  }

  private getExamples(wrapper: Element): string[] {
    try {
      const variants = this.$(wrapper).find('.dsense');
      const res: string[] = [];
      for (let i = 0; i < variants.length; i++) {
        const example = this.clearText(this.$(variants[i]).find('.examp').eq(0).text().trim());
        if (example) res.push(example);
      }
      return res;
    } catch (e) {
      console.error(e?.message);
    }
  }

  private clearText(payload: string) {
    return payload
      .replace(/&nbsp;/g, ' ')
      .replace(/\u00A0/g, ' ')
      .replace(/&ensp;/g, ' ')
      .replace(/\u2002/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[^a-zA-Zа-яё0-9\-!@#$%^&*,.;()— ]/g, '');
  }

  private getUrl(payload: string): string {
    const phrase = payload
      .trim()
      .replace(/[^a-zA-Z0-9\- ]/g, '')
      .replace(' ', '-');
    return encodeURI(`https://dictionary.cambridge.org/dictionary/english-russian/${phrase}`);
  }
}
