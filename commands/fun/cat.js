const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const axios = require('axios').default;

module.exports = {
  name: "cat",
  aliases: [],
  description: "Send A Cat!",

  run: async (client, message, args) => {

    axios.get("https://api.thecatapi.com/v1/images/search?format=json")
      .then(res => {
        let embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Your cute cat is ready! **"MEOW! :heart_eyes_cat:"**`)
          .setImage(res.data[0].url);

        message.channel.send({
          embeds: [embed]
          });
      });

    //End
  }
};