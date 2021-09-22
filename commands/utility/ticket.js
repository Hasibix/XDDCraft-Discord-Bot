const { Permissions } = require('discord.js');

module.exports = {
  name: "ticket",
  aliases: [],
  description: "open a ticket!",
  run : async(client, message, args) => {
    let ticket = (Math.random() + 1).toString(36).slice(2,122);
    
    const channel = await message.guild.channels.create(`ticket code ${ticket}`, {
      type: 'GUILD_TEXT',
	    permissionOverwrites: [
         {
			   id: message.guild.id,
		   	   deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL],
		     },
		     {
			     id: message.author.id,
			     allow: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL],
		     },
       ],
    });


    const reactionMessage = await channel.send("["+client.config.success+"] Thank you for contacting support! Your application code is **"+ticket+"**");

    try {
      await reactionMessage.react("🔒");
      await reactionMessage.react("⛔");
    } catch (err) {
      channel.send("["+client.config.error+"] Error sending emojis!");
      throw err;
    }

    const collector = reactionMessage.createReactionCollector(
      (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).permissions.has("ADMINISTRATOR"),
      { dispose: true }
    );

    collector.on("collect", async(reaction, user) => {
      if(message.author.bot) return;
      switch (reaction.emoji.name) {
        case "🔒":
        if(user.bot) return;
          channel.permissionOverwrites.edit(message.author, { SEND_MESSAGES: false });
          break;
        case "⛔":
        if(user.bot) return;
          setTimeout(() => channel.delete(), 5000);
          let timeOut = await channel.send("Deleting this channel in 5 seconds!");
          await timeOut.edit("Deleting this channel in 4 seconds!");
          await timeOut.edit("Deleting this channel in 3 seconds!");
          await timeOut.edit("Deleting this channel in 2 seconds!");
          await timeOut.edit("Deleting this channel in 1 seconds!");
          break;
      }
    });

    message.channel
      .send(`[${client.config.success}] We will be right with you! ${channel}`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 7000);
        setTimeout(() => message.delete(), 3000);
      })
      .catch((err) => {
        throw err;
      });
  },
};
