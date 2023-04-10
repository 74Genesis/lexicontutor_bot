import { message } from 'telegraf/filters';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import * as fs from 'fs';

dotenv.config();

class App {
  public controllersFolder: string = __dirname + '/controllers';
  private bot: Telegraf;
  private express: express;

  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.express = express();
    this.express.use(express.static('static'));
    this.express.use(express.json());
    // const axios = require('axios');
    // const port = process.env.PORT || 3000;
  }

  run(): void {
    this.express.get('/', (req: any, res: any) => {
      res.sendFile(path.join(__dirname + '../index.html'));
    });

    this.bot.launch();
    this.installControllers();

    //   bot.command('ethereum', (ctx: any) => {
    //       var rate;
    //       console.log(ctx.from)
    //       axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    //       .then((response:any) => {
    //           console.log(response.data)
    //           rate = response.data.ethereum
    //           const message = `Hello, today the ethereum price is ${rate.usd}USD`
    //           bot.telegram.sendMessage(ctx.chat.id, message, {
    //           })
    //       })
    //   })

    //   // const eventHandler = new EventHandler()

    //   bot.command('import', (ctx: any) => {
    //       // eventHandler.handle(ctx)
    //       var rate;
    //       console.log(ctx.from)
    //       axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    //       .then((response: any) => {
    //           console.log(response.data)
    //           rate = response.data.ethereum
    //           const message = `Hello, today the ethereum price is ${rate.usd}USD`
    //           bot.telegram.sendMessage(ctx.chat.id, message, {
    //           })
    //       })
    //   })
  }

  getBot(): Telegraf {
    if (!this.bot) {
      this.bot = new Telegraf(process.env.BOT_TOKEN);
    }
    return this.bot;
  }

  /**
   * Parse "controllers" folder
   */
  private installControllers(): void {
    fs.readdir(this.controllersFolder, (err: any, files: any) => {
      files.forEach(this.installController.bind(this));
    });
  }

  /**
   * Install certain controller
   * @param file file name of the controller from "controllers" folder
   */
  private async installController(file: string): Promise<void> {
    try {
      const controllerClass = await import(this.controllersFolder + '/' + file);
      const controller = new controllerClass.default(this.bot);
      controller.install();
    } catch (e) {
      console.log(e);
    }
  }
}

export default App;
