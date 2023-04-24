import { type ParsedData } from './Dictionary';
import Dictionary from './Dictionary';
import axios from 'axios';
import * as cheerio from 'cheerio';
import type { Element, CheerioAPI } from 'cheerio';

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
      const html = response.data;
      this.$ = cheerio.load(html || '');

      const meaning = {
        word: this.$('#wd_title > h2').text().trim(),
        type: this.getType(),
        translation: this.$('#content_in_russian > t_inline_en').text().trim(),
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
        res.push(this.$(pos[i]).text().trim() || '');
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
    return [];
  }

  private getUrl(payload: string): string {
    const phrase = payload
      .trim()
      .replace(/[^a-zA-Z0-9\- ]/g, '')
      .replace(' ', '-');
    return `https://wooordhunt.ru/word/${phrase}`;
  }
}
