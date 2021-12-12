module.exports = {
  name: "kick",
  category : 'mod',
  aliases : ['kk'],
  description: "kicks the mentioned user",
  run : async(client, message, args) => {

  if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`[${}] I am missing permissions to kick members. [KICK_MEMBERS] `)
  const Member = message.mentions.members.first();
  if(!Member) return message.channel.send("[${}] Please specify a user to kick!");
  await Member.kick();
  message.channel.send(`[${}] ${Member.user.tag} has been kicked!`);
}
}