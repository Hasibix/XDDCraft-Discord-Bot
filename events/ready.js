const client = require("../index.js");
const Discord = require("../index.js");
const colors = require("colors");

client.on('ready', () => {
  client.music.init(client.user.id);
    client.user.setActivity('XDDhelp | play.xddcraft.net', { type: 'STREAMING', url: "https://www.twitch.tv/hasibixlive" })
    client.logger.log(`Discord: ${client.user.username} is online!`)
})