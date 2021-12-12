//Added by Hasibix#0001
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp"],
  description: "Show Member Avatar!",
    usages: "No args || <mention member> || <member id>",

  run: async (client, message, args) => {
    //Start
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .addField(
        "Links",
        `[png](${Member.user.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}) | [jpg](${Member.user.displayAvatarURL({
          format: "jpg",
          dynamic: true
       
        })}) | [webp](${Member.user.displayAvatarURL({
          format: "webp",
          dynamic: true
       
        })})`
      )
      .setImage(Member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

    //End
  }
};