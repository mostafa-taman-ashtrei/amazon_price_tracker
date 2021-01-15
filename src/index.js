require('dotenv').config();
const { Telegraf } = require('telegraf');
const Cron = require('cron');

const commands = require('./commands');
const checkPrice = require('./checkPrice');

(async () => {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    const { CronJob } = Cron;

    const job = new CronJob('00 00 00 * * *', async () => {
        const d = new Date();
        console.log('Midnight:', d);
        const { currentPrice, inStock } = await checkPrice();
        console.log(currentPrice, inStock);
    });

    job.start();

    console.log('Search for Neobot and use the following commands :');
    console.table(commands);

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
