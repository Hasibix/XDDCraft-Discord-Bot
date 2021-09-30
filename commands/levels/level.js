const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "level",
  aliases: ["lvl", "xp"],
  description: "Show User Level and XP!",
  run: async (client, message, args) => {
    let target = message.mentions.users.first() || message.author;
    
    const level = await client.checkLevel(target.id);
    const xp = await client.checkXP(target.id);

    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle(`Level and xp of ${target.tag}`)
        .setDescription(`**Level:** ${parseInt(level)}\n**XP:** ${parseInt(xp)}\n**Guild:** ${message.guild.name}`)
        .setColor(client.levelColor)
      ]
    })
  }
}