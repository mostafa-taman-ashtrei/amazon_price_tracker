import { Scenes } from 'telegraf';
import checkPrice from '../checkPrice';

const priceScene = new Scenes.BaseScene<Scenes.SceneContext>('priceScene');

priceScene.enter((ctx) => ctx.reply('Send me an amazon link'));

priceScene.on('text', async (ctx) => {
    const { inStock, currentPrice } = await checkPrice();
    ctx.reply(`The ${ctx.update.message.text} is ${inStock} for ${currentPrice}`);
});

priceScene.command('/out', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat!.id, 'Bye, type /start to get start again');
    ctx.scene.leave();
});

export default priceScene;
