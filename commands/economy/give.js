  const { Client, Message, MessageEmbed } = require('discord.js');
  const db = require("quick.db");
  
	module.exports = {
			name: 'givemoney',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/

		run: async(client, message, args) => {
      const user = message.mentions.users.first()
      const coins = args[1]
      if(!user) return message.channel.send(`[${client.config.error}] Please type a user to give/donate your money!`)
      if(!coins) return message.channel.send(`[${client.config.error}] Please type a amount of money you want to give/donate to ${user.user.tag}`)
      if(isNaN(coins)) return message.channel.send(`[${client.config.error}] Please type a real amount of money you want to give/donate to ${user.user.tag}`)
      client.addmoney(user.id, parseInt(coins))
      client.rmvmoney(message.author.id, parseInt(coins))
      message.channel.send(`[${client.config.success}] Successfully gave **${coins}** coins to <@${user.id}>!`)
    }
  }