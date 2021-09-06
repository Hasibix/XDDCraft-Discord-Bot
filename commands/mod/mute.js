const { MessageEmbed } = require("discord.js");
const ms =  require("ms");

module.exports = {
  name: "mute",
  category : 'mod',
  aliases : ['shut'],
  description: "bans the mentioned user",
  /**
     * @param {Message} message
     */
  run : async(client, message, args) => {
    const noPermmissionEmbed = new MessageEmbed()
    .setDescription("<:XDDCraft_X:792256780158631966> I'm missing the following permissions: Ban Members")
    .setColor("RED");

  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(noPermissionEmbed)
  const Member = message.mentions.members.first();
  if(!Member) {
    message.channel.send(":x: | Please specify a user to ban!");
    } else await Member.ban({ reason: args.slice(1).join(" ")});
  message.channel.send(Member.user.tag + " has been banned! Reason: "+ args.slice(1).join(" "));

}
}