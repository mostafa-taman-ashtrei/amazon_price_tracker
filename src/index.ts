import { config } from 'dotenv';
import {
    Scenes, Telegraf, session, Markup,
} from 'telegraf';
import priceScene from './scenes/priceScene';
import { MyContext } from './types/MyContext';
// import checkPrice from './checkPrice';

config();

(async () => {
    const bot = new Telegraf<MyContext>(process.env.TELEGRAM_BOT_TOKEN!);
    const stage = new Scenes.Stage<MyContext>([priceScene]);

    bot.use(session());
    bot.use(stage.middleware());

    bot.start((ctx) => {
        const message = `Welcome ${ctx.from!.first_name} to Neo weather bot`;

        const options = Markup.inlineKeyboard([
            Markup.button.callback('Track Amazon Prices', 'getprice'),
        ]);

        ctx.reply(message, options);
    });

    bot.action('getprice', (ctx) => ctx.scene.enter('priceScene'));

    bot.launch();
    console.log('Bot is ready (:');
})();
