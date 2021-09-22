module.exports = {
  name: "kick",
  aliases : [''],
  description: "Kick A Member!",
  permissions: ["KICK_MEMBERS"],
  run : async(client, message, args) => {

  if(!message.guild.me.permissions.has('KICK_MEMBERS')) return message.channel.send(`[${client.config.error}] I am missing permissions to kick members. [KICK_MEMBERS] `)
  const Member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");
  if(!Member) return message.channel.send(`[${client.config.error}] Please mention a member that you want to kick!`);
  if (Member.id === message.author.id)
      return message.channel.send(`[${client.config.warning}] You can't kick your self!`);

  if(Member.id === client.user.id) return message.channel.send("[:cry:] Please don't kick me ;-;")
  if(!reason) {
  await Member.kick();
  message.channel.send(`[${client.config.success}] **${Member.user.tag}** has been kicked!`);
  } else {
  await Member.kick(reason);
  message.channel.send(`[${client.config.success}] **${Member.user.tag}** has been kicked! Reason: ${reason}`);
  }
  
        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;


          let embedModLog = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(Member.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
            .addField("**Moderation**", "kick")
            .addField("**Kicked**", `${Member.user.username}`)
            .addField("**ID**", `${Member.user.id}`)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason}` || "**No Reason**")
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send({embeds: [embedModLog]})
   }
}