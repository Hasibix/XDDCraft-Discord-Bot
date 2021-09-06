 const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  category : 'mod',
  aliases : ['banhammer'],
  description: "bans the mentioned user",
  run : async(client, message, args) => {
    const noPermmissionEmbed = new MessageEmbed()
    .setDescription("<:XDDCraft_X:792256780158631966> I'm missing the following permissions: Ban Members")
    .setColor("RED");
  const banEmbed = new MessageEmbed()
  .setDescription(`<:socsoss:882993071644622898> _**${Member.user.tag} has been banned**_`)
  .setColor("GREEN");
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(noPermissionEmbed)
  const Member = message.mentions.members.first();
  if(!Member) {
    message.channel.send(":x: | Please specify a user to ban!");
    } else await Member.ban({ reason: args.slice(1).join(" ")});
  message.channel.send(banEmbed);

}
}

// /home/runner/FUCKGODIEBITCH/commands/mod/ban.js:12
  //const banEmbed = mew MessageEmbed()
    //                   ^^^^^^^^^^^^

// SyntaxError: Unexpected identifier
// Hint: hit control+c anytime to enter REPL.
//  

