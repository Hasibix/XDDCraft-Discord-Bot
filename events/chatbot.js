const client = require("../index")
const chatbotschema = require("../models/chat-bot.js")
const fetch = require('node-fetch');

client.on("messageCreate", async(message) => {
  if(!message.guild || message.author.bot) return;
  chatbotschema.findOne({ Guild: message.guild.id }, async(err, data) => {
    if(!data) return;
    if(message.channel.id !== data.Channel) return;
    if (err) throw err;

        if (message.channel.id === data.Channel) {
            fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&yr0n57JXpCy7aXlzFmMchuas`)
                .then(response => response.json())
                .then(data => {
                    message.reply(`${data.response}`, { allowedMentions: { repliedUser: false } })
                })
        }
  })
})