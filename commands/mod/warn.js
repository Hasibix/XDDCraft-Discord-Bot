const warnSchema = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'warn',
    /**
     * @param {Message} message
      */
    permissions: ["ADMINISTRATOR"],
            usage: "<mention member> <reason>",
    run : async(client, message, args) => {
       let user = message.mentions.users.first()
       let reason = args.slice(1).join(" ")

       if(!user || !reason) return message.channel.send(`[${client.emoji.error}] Invalid args! [XDDwarn <mention member> <reason>]`)

       new warnSchema({
         User: user.id,
         Guild: message.guild.id,
         Moderator: message.author.id,
         Reason: reason,
         Timestamp: Date.now()
       }).save()
      
       user.send(`**You have been wanred in ${message.guild.name} for ${reason}!**`).catch(err => console.log(err))
       message.channel.send(`[${client.emoji.success}] ${user.tag} has been warned! reason: ${reason}`)
    }
}