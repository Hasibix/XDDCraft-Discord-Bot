const Discord = require("discord.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports = {
  name: "addxp",
  description: "gives xp",
    usage: "<amount> || <amount> <mention member>",
  permissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    const amount = args[0]
    const amountToAdd = parseInt(args[0])
    
    if(!amount) return message.channel.send(`[${client.emoji.error}] Please specify a amount of xp to give`)
    if(isNaN(amount)) return message.channel.send(`[${client.emoji.error}] Please specify a valid amount of xp to give`)
    if(amount < 0 || 9999999 < amount) return message.channel.send(`[${client.emoji.error}] The amount is too small or too big! please dont put big amounts or your level will be bugged and your level account will be deleted!`)
    let member;
    if(args[1]) {
      if(isNaN(args[1])) {
        member = message.mentions.members.first()
      } else {
        member = message.guild.members.cache.get(args[1])
      }
    } else {
      member = message.author
    }

    try {
      message.guild.members.cache.get(member.id)
    } catch (err) {
      console.log(err)
      return message.channel.send(`[${client.emoji.error}] Invalid user! Make sure the user is in same guild as you.`)
    }
    client.appendXP(member.id, message.guild.id, amountToAdd)
    
    if(member.id === message.author.id) {
      message.channel.send(`[${client.emoji.success}] Successfully added \`${args[0]}\` xp to you.`)
    } else {
      message.channel.send(`[${client.emoji.success}] Successfully added \`${args[0]}\` xp to \`${member.user.tag}\``)
    }
  }
}