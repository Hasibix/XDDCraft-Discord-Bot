const db = require('../../models/warns')
const daba = require("quick.db")

module.exports = {
    name : 'unwarn',
    permissions: ["ADMINISTRATOR"],
    run : async(client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(`[${client.config.error}] Please mention a user to unwarn`)
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send(`[${client.config.success}] Successfully unwarned ${user.tag}!`)
                data.save()
            } else {
                message.channel.send('['+client.config.error+'] This user does not have any warns in this server!')
            }
        })
            let channel = daba.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embedModLog = new MessageEmbed()
                .setColor('GREEN')
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
                .addField("**Moderation**", "unwarn")
                .addField("**Unwarned**", user.user.username)
                .addField("**Moderator**", message.author.username)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({ embeds: [embedModLog]})
    }
}