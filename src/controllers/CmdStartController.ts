import { Context } from 'telegraf';
import MainController from '../core/MainController';

export default class StartController extends MainController {
  install() {
    this.bot.command('start', this.handler.bind(this));
  }
  handler(ctx: Context): void {
    this.bot.telegram.sendMessage(ctx.chat.id, 'Hello world', {});
  }
}
