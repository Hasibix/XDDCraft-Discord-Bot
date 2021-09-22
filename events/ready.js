const client = require("../index.js");
const Discord = require("../index.js");


client.on('ready', () => {
    
    client.user.setActivity('XDDhelp | play.xddcraft.net', { type: 'STREAMING', url: "https://www.twitch.tv/hasibixlive" })
    console.log(`${client.user.username} ✅`)
    console.log("set activity to Streaming XDDhelp | play.xddcraft.net with url https://www.twitch.tv/hasibixlive")

    
})