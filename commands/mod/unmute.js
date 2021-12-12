const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
        name: "unmute",
        aliases: ["um"],
        description: "Unmutes a member in the discord!",
        usage: "<mention member>",
     permissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {

        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send(`[${client.emoji.error}] I don't have permissions To unmute Someone ;-; [MANAGE_ROLES]`)
        if (!args[0]) return message.channel.send(`[${client.emoji.error}]Please enter a user!`)
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send(`[${client.emoji.error}] Please mention a valid user to unmute!`);


        let muterole;
        let dbmute = await client.fetchMuteRole(message.guild.id);
        let muteerole = message.guild.roles.cache.find(r => r.name === "Muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = client.fetchMuteId(message.guild.id, mutee.id)
        if (!rolefetched) return;

        if (!muterole) return message.channel.send(`[${client.emoji.error}] There is no mute role to remove!`)
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send(`[${client.emoji.error}] The user is not muted!`)
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**You have been unmuted in ${message.guild.name}**!`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            
            message.channel.send(`[${client.emoji.success}] ${mutee.user.username} was successfully unmuted!`);
        
    }
}