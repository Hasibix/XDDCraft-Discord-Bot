const db = require("quick.db")

module.exports = {

        name: "setmodlogchannel",
        aliases: ['setm', 'sm', 'smc', 'setmodlog', 'setlog', 'setlogchannel'],
        description: "Sets A Channel Where The client Can Send Logs!",
    permissions: ["ADMINISTRATOR", "MANAGE_GUILD"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`[${client.config.error}] You don't have permissions to set modlog/log channel! [ADMINISTRATOR]`)
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `[${client.config.success}] Modlog/log channel set in this server is \`${channelName.name}\`!`
        );
      } else
        return message.channel.send(
          `[${client.config.error}] Please enter a channel name or ID to set!`
        );
    }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send(`[${client.config.warning}] This channel is already set as modlog/log channel!`)
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`Modlog Channel Set!`)
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`[${client.config.success}] Modlog/log channel has been set successfully to \`${channel.name}\``)
            }
        } catch {
            return message.channel.send(`[${client.config.error}] An error occurred!`);
        }
    }
};