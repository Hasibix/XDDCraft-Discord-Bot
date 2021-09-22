const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
        name: "unmute",
        aliases: ["um"],
        description: "Unmutes a member in the discord!",
     permissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {

        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send(`[${client.config.error}] I don't have permissions To unmute Someone ;-; [MANAGE_ROLES]`)
        if (!args[0]) return message.channel.send("**Please Enter A User!**")
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send(`[${client.config.error}] Please mention a valid user to unmute!`);

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "Muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole) return message.channel.send(`[${client.config.error}] There is no mute role to remove!`)
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send(`[${client.config.error}] The user is not muted!`)
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**You Have Been Unmuted In ${message.guild.name}**!`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            
            message.channel.send(`[${client.config.success}] ${mutee.user.username} was successfully unmuted!`);
        

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embedModLog = new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
            .addField("**Moderation**", "unmute")
            .addField("**Unmuted**", mutee.user.username)
            .addField("**Moderator**", message.author.username)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send({ embeds: [embedModLog]})

    }
}