const checkPrice = async (page) => {
    try {
        await page.reload();

        const price = await page.evaluate(() => document.getElementById('priceblock_ourprice').innerHTML);
        const inStockSpan = await page.evaluate(() => document.getElementById('availability').querySelector('span').innerHTML);

        const currentPrice = Number(price.replace(/[^0-9.-]+/g, ''));
        const inStock = inStockSpan.trim();

        console.log(currentPrice);
        console.log(inStock);
    } catch (e) {
        console.log(e);
    }
};

module.exports = checkPrice;
