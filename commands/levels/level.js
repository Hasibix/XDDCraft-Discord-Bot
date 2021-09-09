const { Client, Message, MessageEmbed } = require('discord.js')
const Levels = require('discord-xp')
module.exports = {
    name : 'level',
    category : 'xp',
    aliases : ['rank'],
    description : 'shows your level',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
      
      const target = message.mentions.users.first() || message.author;
      const user = await Levels.fetch(target.id, message.guild.id);
      if (!user) return message.channel.send("Seems like this user has not earned any xp so far.");
      message.channel.send(`> **${target.tag}** is currently in level ${user.level}.`);
      
    }
}