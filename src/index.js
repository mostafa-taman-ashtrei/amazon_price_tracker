require('dotenv').config();
const { Telegraf } = require('telegraf');

const checkPrice = require('./checkPrice');

(async () => {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    console.log('Seatch for Neobot and use /start command to get started');

    bot.use(async (_, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log('Response time: %sms', ms);
    });

    bot.start((ctx) => { ctx.reply(`Welcome to neobot, ${ctx.message.from.first_name}`); });

    bot.command('checkPrice', async (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'checking ...');
        const { currentPrice, inStock } = await checkPrice();
        ctx.telegram.sendMessage(
            ctx.message.chat.id,
            `current price is ${currentPrice} and the item is ${inStock}`,
        );
    });

    bot.launch();
})();
