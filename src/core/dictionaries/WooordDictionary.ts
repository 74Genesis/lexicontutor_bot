import { type ParsedData } from './Dictionary';
import Dictionary from './Dictionary';
import axios from 'axios';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

export default class WooordDictionary extends Dictionary {
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
      const html = response?.data;
      this.$ = cheerio.load(html || '');

      const meaning = {
        word: this.clearText(this.$('#wd_title > h2').text().trim()),
        type: this.getType(),
        translation: this.clearText(this.$('#content_in_russian > .t_inline_en').text().trim()),
        translations: this.getTranslations(),
        examples: this.getExamples(),
      };
      if (meaning.word && meaning.translation) return { entry: payload, response: [meaning] };
    } catch (e) {
      console.error('Fail parse from dictionary: ', e?.message);
    }

    return { entry: payload, response: [] };
  }

  private getType() {
    try {
      const pos = this.$('body').find('.pos_item');
      const res = [];
      for (let i = 0; i < pos.length; i++) {
        const type = this.clearText(this.$(pos[i]).text().trim());
        if (type) res.push(type);
      }
      return res.join(' / ');
    } catch (e) {
      console.error(e?.message);
    }
    return '';
  }

  private getTranslations(): string[] {
    return [];
  }
  private getExamples(): string[] {
    try {
      const phrases = this.$('body').find('.phrases').eq(0).html();
      const arr = phrases.split('<br>');
      const res = [];
      for (let i = 0; i < arr.length; i++) {
        let phrase = this.clearText(cheerio.load(arr[i]).text());
        if (phrase) res.push(phrase);
      }
      return res;
    } catch (e) {
      console.error(e?.message);
    }
    //phrases
    return [];
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
    return encodeURI(`https://wooordhunt.ru/word/${phrase}`);
  }
}
