import { Context } from 'telegraf';
import MainController from '../core/MainController';
import { Composer, Scenes, session, Telegraf } from 'telegraf';
import { Markup } from 'telegraf';

export default class OnMessageController extends MainController {
  public msg: number = null;
  install() {
    this.bot.on('message', this.handler.bind(this));
    this.bot.action('next', this.next.bind(this));

    // const stepHandler = new Composer<Scenes.WizardContext>();
    // stepHandler.action('next', async (ctx) => {
    //   await ctx.reply('Step 2. Via inline button');
    //   return ctx.wizard.next();
    // });
    // stepHandler.command('next', async (ctx) => {
    //   await ctx.reply('Step 2. Via command');
    //   return ctx.wizard.next();
    // });
    // stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'));

    // const superWizard = new Scenes.WizardScene(
    //   'super-wizard',
    //   async (ctx) => {
    //     await ctx.reply(
    //       'Step 1',
    //       Markup.inlineKeyboard([
    //         Markup.button.url('❤️', 'http://telegraf.js.org'),
    //         Markup.button.callback('➡️ Next', 'next'),
    //       ]),
    //     );
    //     return ctx.wizard.next();
    //   },
    //   stepHandler,
    //   async (ctx) => {
    //     await ctx.reply('Step 3');
    //     return ctx.wizard.next();
    //   },
    //   async (ctx) => {
    //     await ctx.reply('Step 4');
    //     return ctx.wizard.next();
    //   },
    //   async (ctx) => {
    //     await ctx.reply('Done');
    //     return await ctx.scene.leave();
    //   },
    // );

    // const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
    //   default: 'super-wizard',
    // });
    // this.bot.use(session());
    // this.bot.use(stage.middleware());
  }
  next(ctx: Context) {
    if (this.msg) {
      ctx.telegram.editMessageText(ctx.chat.id, this.msg, '', 'new text');
    }
  }
  async handler(ctx: Context) {
    // this.bot.telegram.sendMessage(
    //   ctx.chat.id,
    //   `
    //     <b>bold</b>, <strong>bold</strong>
    //     <i>italic</i>, <em>italic</em>
    //     <u>underline</u>, <ins>underline</ins>
    //     <s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
    //     <span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
    //     <b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
    //     <a href="http://www.example.com/">inline URL</a>
    //     <a href="tg://user?id=123456789">inline mention of a user</a>
    //     <tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>
    //     <code>inline fixed-width code</code>
    //     <pre>pre-formatted fixed-width code block</pre>
    //     <pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
    // `,
    //   { parse_mode: 'HTML' },
    // );
    const { message_id } = await ctx.reply(
      'Step 1',
      Markup.inlineKeyboard([
        Markup.button.url('❤️', 'http://telegraf.js.org'),
        Markup.button.callback('➡️ Next', 'next'),
      ]),
    );
    this.msg = message_id;
    // return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
    //   parse_mode: 'HTML',
    //   ...Markup.inlineKeyboard([
    //     Markup.button.callback('Easy (7 days)', 'Coke'),
    //     Markup.button.callback('Medium (4 days)', 'Pepsi'),
    //     Markup.button.callback('Hard (1 days)', 'Pepsi'),
    //     Markup.button.callback('Again (1 minute)', 'Pepsi'),
    //   ]),
    // });
  }
}
