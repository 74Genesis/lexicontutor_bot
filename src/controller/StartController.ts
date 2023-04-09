import MainController from './MainController';

export default class StartController extends MainController {
  install() {
    this.bot.command('start', (ctx: any) => {
      console.log(ctx.from);
      this.bot.telegram.sendMessage(
        ctx.chat.id,
        'Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it',
        {},
      );
    });
  }
}
