const { message } = require("telegraf/filters");

const express = require("express");
const expressApp = express();
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());
require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

class App {
  constructor() {}
  run() {
    expressApp.get("/", (req: any, res: any) => {
      res.sendFile(path.join(__dirname + "../index.html"));
    });

    bot.launch();
    this.parseControllers();

    //   bot.command('start', (ctx: any) => {
    //       console.log(ctx.from)
    //       bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it', {
    //       })
    //     })

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

    //   bot.on("message", (ctx: any) => {
    //       console.log(ctx.from, ctx.message)
    //       setTimeout(() => {
    //           bot.telegram.sendMessage(ctx.chat.id, "Сам такой", {
    //           })
    //       })
    //   });
  }
  parseControllers() {
    const testFolder = "./controller/";
    const fs = require("fs");
    console.log(fs);
    fs.readdir(testFolder, (err: any, files: any) => {
      console.log(files);
      //   files.forEach((file: any) => {
      //     console.log(file);
      //   });
    });
  }
}

export default App;
