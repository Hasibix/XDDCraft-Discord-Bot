const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
console.log("http server is ready!")
// index.js

require("dotenv").config();

const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const Eco = require("quick.eco");
client.eco = new Eco.Manager();
client.db = Eco.db;
const config = require('./config.json')
const prefix = config.prefix;
const prefixNormal = config.prefix;
const giveawayPrefix = config.prefixGiveaway;
//economy shop items
client.shop = {
  "laptop": {
    cost: 5000
  },
  "phone": {
    cost: 3500
  },
  "pc": {
    cost: 10000
  }

};
client.config = config;
//giveaway config
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
//other things
const token = process.env.BOT_TOKEN
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_DB)
client.commands = new Collection();
module.exports = client;
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.login(token)


//level and xp system
const Levels = require("discord-xp");
Levels.setURL(process.env.MONGO_DB);

client.on("message", async (message) => {

 if (!message.guild) return;

 if (message.author.bot) return;

  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30

 const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

 if (hasLeveledUp) {

   const user = await Levels.fetch(message.author.id, message.guild.id);

   message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);

 }

});
