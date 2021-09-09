module.exports = {
  name: "ticket",
  aliases: [],
  description: "open a ticket!",
  run : async(client, message, args) => {
    const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
    
    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGE: false,
      VIEW_CHANNEL: false,
    });
    channel.updateOverwrite(message.author, {
      SEND_MESSAGE: true,
      VIEW_CHANNEL: true,
    });

    const reactionMessage = await channel.send("Thank you for contacting support!");

    try {
      await reactionMessage.react("🔒");
      await reactionMessage.react("⛔");
    } catch (err) {
      channel.send("Error sending emojis!");
      throw err;
    }

    const collector = reactionMessage.createReactionCollector(
      (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
      { dispose: true }
    );

    collector.on("collect", async(reaction, user) => {
      if(message.author.bot) return;
      switch (reaction.emoji.name) {
        case "🔒":
        if(message.author.bot) return;
          channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
          break;
        case "⛔":
        if(message.author.bot) return;
          let timeOut = await channel.send("Deleting this channel in 5 seconds!");
          await timeOut.edit("Deleting this channel in 4 seconds!");
          await timeOut.edit("Deleting this channel in 3 seconds!");
          await timeOut.edit("Deleting this channel in 2 seconds!");
          await timeOut.edit("Deleting this channel in 1 seconds!");
          setTimeout(() => channel.delete(), 5000);
          break;
      }
    });

    message.channel
      .send(`We will be right with you! ${channel}`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 7000);
        setTimeout(() => message.delete(), 3000);
      })
      .catch((err) => {
        throw err;
      });
  },
};
