const client = require("../index.js")
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
                    message.channel.sendTyping();
                     setTimeout(() => {
                       if(!data.response) return;
                       message.reply({ content: `${data.response.toString()}`, allowedMentions: { repliedUser: false } })
                     }, 2000)
                })
        }
  })
})