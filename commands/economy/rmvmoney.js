	const { Client, Message, MessageEmbed } = require('discord.js');
			
	module.exports = {
			name: 'removemoney',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    permissions: ["ADMINISTRATOR"],
      usages: "<amount> || <amount> <mention member>",
    description: "remove money from a user",
		run: async(client, message, args) => {
      const member = message.mentions.users.first() || message.author;
      if(isNaN(args[0])) return message.channel.send(`[${client.emoji.error}] Please enter a real amount to remove!`);
      client.rmvmoney(member.id, parseInt(args[0]))
      message.channel.send(`[${client.emoji.success}] Removed ${parseInt(args[0])} :dollar: from ${member.tag}`)
    }
  }