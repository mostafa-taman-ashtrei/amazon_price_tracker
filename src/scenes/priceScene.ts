import { Scenes } from 'telegraf';
import checkPrice from '../checkPrice';

const priceScene = new Scenes.BaseScene<Scenes.SceneContext>('priceScene');

priceScene.enter(async (ctx) => {
    const { inStock, currentPrice } = await checkPrice();
    ctx.reply(`The product is ${inStock} for ${currentPrice}`);
});

priceScene.command('check', async (ctx) => {
    const { inStock, currentPrice } = await checkPrice();
    ctx.reply(`The product is ${inStock} for ${currentPrice}`);
});

priceScene.command('/out', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat!.id, 'Bye, type /start to get start again');
    ctx.scene.leave();
});

export default priceScene;
