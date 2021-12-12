module.exports = {
  name: "kick",
  aliases : [''],
  description: "Kick A Member!",
  permissions: ["KICK_MEMBERS"],
      usage: "<mention member> || <mention member> <reason>",
  run : async(client, message, args) => {

  if(!message.guild.me.permissions.has('KICK_MEMBERS')) return message.channel.send(`[${client.emoji.error}] I am missing permissions to kick members. [KICK_MEMBERS] `)
  const Member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");
  if(!Member) return message.channel.send(`[${client.emoji.error}] Please mention a member that you want to kick!`);
  if (Member.id === message.author.id)
      return message.channel.send(`[${client.emoji.warning}] You can't kick your self!`);

  if(Member.id === client.user.id) return message.channel.send("[:cry:] Please don't kick me ;-;")
  if(!reason) {
  await Member.kick();
  message.channel.send(`[${client.emoji.success}] **${Member.user.tag}** has been kicked!`);
  } else {
  await Member.kick(reason);
  message.channel.send(`[${client.emoji.success}] **${Member.user.tag}** has been kicked! Reason: ${reason}`);
  }
  
   }
}