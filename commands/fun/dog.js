const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dog",
  aliases: [],
  description: "Send A Dog!",
  run: async (client, message, args) => {

    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(json => {
        let embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Your cute doggy is ready! **"BORK! :dog:"**`)
          .setImage(json.message);

        message.channel.send({
          embeds: [embed]
          });
      });

    //End
  }
};