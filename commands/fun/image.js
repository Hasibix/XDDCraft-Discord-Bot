const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send(`[${client.config.error}] Please search something to find the image! (ex: [XDDimage xddcraft])`)

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}
