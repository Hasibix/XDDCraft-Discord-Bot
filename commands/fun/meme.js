const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "meme",
  aliases: [],
  description: "Send A Meme!",
  run: async (client, message, args) => {

    fetch("https://meme-api.herokuapp.com/gimme")
      .then(res => res.json())
      .then(json => {
        let embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`${json.title}`)
          .setURL(json.postLink)
          .setImage(json.url)
          .setFooter(`From /r/${json.subreddit}`);

        message.channel.send({
          embeds: [embed]
          });
      });

    //End
  }
};