import { Context } from 'telegraf';
import MainController from '../core/MainController';

export default class OnMessageController extends MainController {
  install() {
    this.bot.on('message', this.handler.bind(this));
  }
  handler(ctx: Context) {
    this.bot.telegram.sendMessage(ctx.chat.id, 'msg', {});
  }
}
