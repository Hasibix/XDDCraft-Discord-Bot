const { MessageEmbed } = require("discord.js");
const ms =  require("ms");
const db = require("quick.db");

module.exports = {
  name: "mute",
  category : 'mod',
  aliases : ['shut'],
  description: "mutes the mentioned user",
  /**
     * @param {Message} message
     */
  run : async(client, message, args) => {
    const mainRole = message.guild.roles.cache.find(role => role.name === 'Members');
    const mainRole2 = message.guild.roles.cache.find(role => role.name === 'Verifed');
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    

  if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`[${}] I am missing permissions to mute members. [MANAGE_ROLES]`)
  const Member = message.mentions.members.first();
  if(!Member) {
    message.channel.send(`[${}] Please specify a member to mute!`);
    } else {
    if(!args[1]) {
       message.channel.send(`[${}] ${Member.user.tag} has been muted!`);
       await Member.roles.remove(mainRole.id)
       await Member.roles.add(muteRole.id)
       
    } else if (!args[2]) {
        message.channel.send(`[${}] ${Member.user.tag} has been muted for ${ms(ms(args[1]))}!`);
       await Member.roles.remove(mainRole.id)
       await Member.roles.add(muteRole.id)
    } else {
      message.channel.send(`[${}] ${Member.user.tag} has been muted for ${ms(ms(args[1]))}! Reason: ${args.slice(2).join(" ")}`);
       await Member.roles.remove(mainRole.id)
       await Member.roles.add(muteRole.id)
    }
    setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
    }
}
}