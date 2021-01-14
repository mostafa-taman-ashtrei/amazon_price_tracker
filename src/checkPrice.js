const pupppeteer = require('puppeteer');

const checkPrice = async () => {
    const ProductUrl = 'https://www.amazon.com/Potensic-Quadcopter-Portable-Beginner-Expert-Upgrade/dp/B08JQ5X7DD/ref=sr_1_1_sspa?crid=1AE1AWCT46QE2&dchild=1&keywords=drones+with+camera+for+adults&qid=1610581680&sprefix=drones%2Caps%2C302&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyMVJLSU1JWjE3NjBZJmVuY3J5cHRlZElkPUEwNTQ4MzA5MjQ0UEVDRTlJUTEyNiZlbmNyeXB0ZWRBZElkPUEwMjU4OTY2Nk9MSVNCVUlYQ0xZJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==';

    try {
        const browser = await pupppeteer.launch();
        const page = await browser.newPage();
        await page.goto(ProductUrl, { waitUntil: 'load', timeout: 0 });
        await page.reload();

        page.setViewport({ width: 900, height: 1500 });
        await page.screenshot({ path: `src/screenshot${Date.now()}.png` });

        const price = await page.evaluate(() => document.getElementById('priceblock_ourprice').innerHTML);
        const inStockSpan = await page.evaluate(() => document.getElementById('availability').querySelector('span').innerHTML);

        const currentPrice = Number(price.replace(/[^0-9.-]+/g, ''));
        const inStock = inStockSpan.trim();

        console.log(currentPrice);
        console.log(inStock);

        await browser.close();

        return {
            currentPrice,
            inStock,
        };
    } catch (e) {
        console.log(e);
        throw new Error('web scraping failed due to some error');
    }
};

module.exports = checkPrice;
