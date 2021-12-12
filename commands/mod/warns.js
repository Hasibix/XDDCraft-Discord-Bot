const warnSchema = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')
const moment = require("moment")

module.exports = {
    name :'warns',
    aliases: ['warnings'],
    /**
     * @param {Message} message
     */
    usage: "<mention member>",
    permissions: ["ADMINISTRATOR"],
    run : async(client, message, args) => {

        const user = message.mentions.members.first()
        if(!user) return message.channel.send(`[${client.emoji.error}] Please mention a user to see warnings!`)
      const userWarns = await warnSchema.find({ Guild: message.guild.id, User: user.id })
      if(!userWarns?.lengh) {
        return message.channel.send(
         `[${client.emoji.error}] **${user.user.tag}** has no warnings in this server.`
        )
      }
      const embedDesc = userWarns.map((warn, i) => {
        const moderator = message.guild.members.cache.get(warn.Moderator).user;
        return [
          `${i + 1} | **WarnID**: ${warn._id}`,
          `**Moderator**: ${moderator.tag || "Has left the server"}`,
          `**Date**: ${moment(warn.Timestamp).format("MMMM Do YYYY")}`,
          `**Reason**: ${warn.Reason}`,
        ].join("\n\n")
      })
    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle(`${user.tag}'s warnings`)
        .setDescription(embedDesc.toString())
        .setColor(client.modColor)
      ]
    })
    }
}