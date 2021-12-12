const Discord = require("discord.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports = {
  name: "remove-level",
  description: "gives level",
  permissions: ["ADMINISTRATOR"],
      usage: "<amount> || <amount> <mention member>",
  run: async (client, message, args) => {
    const amount = args[0]
    const amountToRemove = parseInt(args[0])
    
 
    if(!amount) return message.channel.send(`[${client.emoji.error}] Please specify a amount of level to remove`)
    if(isNaN(amount)) return message.channel.send(`[${client.emoji.error}] Please specify a valid amount of level to remove`)
    if(amount < 0 || 9999 < amount) return message.channel.send(`[${client.emoji.error}] The amount is too small or too big! please dont put big amounts or your level will be bugged and your level account will be deleted!`)
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
      const user = await client.lvlfetch(member.id, message.guild.id)
      if(!user || user.Level < 0) return message.channel.send(`[${client.emoji.error}] The user doesnt have any level!`)
      if(amountToRemove > user.Level) return message.channel.send(`[${client.emoji.error}] You can only remove amount of level which is not bigger than user's level!`)
    } catch (err) {
      console.log(err)
      return message.channel.send(`[${client.emoji.error}] Invalid user! Make sure the user is in same guild as you.`)
    }
    client.subtractLevel(member.id, message.guild.id, amountToRemove)
    
    if(member.id === message.author.id) {
      message.channel.send(`[${client.emoji.success}] Successfully removed \`${args[0]}\` level from you.`)
    } else {
      message.channel.send(`[${client.emoji.success}] Successfully removed \`${args[0]}\` level from \`${member.user.tag}\``)
    }
  }
}