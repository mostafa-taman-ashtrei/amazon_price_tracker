const commands = [
    {
        name: 'start',
        command: '/start',
        desc: 'When issued the bot replies with a welcome message',
    },
    {
        name: 'check price',
        command: '/checkPrice',
        desc: 'When issued the bot will scrape amazon for prices && see if that item is in stock',
    },
];

module.exports = commands;
