const client = require("../index.js");
const Discord = require("../index.js");


client.on('ready', () => {

        client.user.setPresence({
          status: "streaming",
          activity: {
          name: "XDDhelp | play.xddcraft.net",
          type: "STREAMING",
          url: "https://twitch.tv/hasibixlive"
        },
      });
     
    console.log(`${client.user.username} ✅`)
    })