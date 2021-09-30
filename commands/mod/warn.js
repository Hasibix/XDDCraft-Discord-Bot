const db = require('../../models/warns')
const daba = require("../../models/modlogs")
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'warn',
    /**
     * @param {Message} message
     */
    permissions: ["ADMINISTRATOR"],
    run : async(client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send(`[${client.config.error}] Please mention a user to warn!`)
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(`**You were warned in ${message.guild.name} for:** ${reason}`).catch((err) => {
          console.log(`I could not send a user's warn dm message! ;-; \n{\n   DisplayName: ${user.displayName}\n   Discriminator: ${user.discriminator}\n   ID: ${user.id}\n   Reason: ${reason}\n   Moderator: ${message.author.tag}\n}`)
        })
        message.channel.send(`[${client.config.success}] ${user.user.tag} has been warned successfully! Reason: ${reason}`)
        


            daba.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(!data) return;
              let channel = message.guild.channels.cache.get(data.Channel)
              
              if (!channel) return;

            let embedModLog = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
                .addField("**Moderation**", "warn")
                .addField("**Warned**", user.user.username)
                .addField("**Moderator**", message.author.username)
                .addField("**Reason**", `${reason}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()


            channel.send({ embeds: [embedModLog]})
            })
    }
}