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
const musicPrefix = config.prefixMusic;
const giveawayPrefix = config.prefixGiveaway;
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

client.gCommands = new Collection();
client.gAliases = new Collection();
client.gCategories = fs.readdirSync("./gCommands/");
["gCommand"].forEach(handler => {
    require(`./gHandlers/${handler}`)(client);
});

client.mCommands = new Collection();
client.mAliases = new Collection();
client.mCategories = fs.readdirSync("./mCommands/");
["mCommand"].forEach(handler => {
    require(`./mHandlers/${handler}`)(client);
}); 


client.login(token)



