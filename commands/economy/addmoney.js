	const { Client, Message, MessageEmbed } = require('discord.js');
			
	module.exports = {
			name: 'addmoney',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
      description: "add money",
        usages: "<amount> || <amount> <mention member>",
    permissions: ["ADMINISTRATOR"],
		run: async(client, message, args) => {
      const member = message.mentions.users.first() || message.author;
      if(isNaN(args[0])) return message.channel.send(`[${client.emoji.error}] Please enter a real amount to add!`);
      client.addmoney(member.id, parseInt(args[0]))
      message.channel.send(`[${client.emoji.success}] Added ${parseInt(args[0])} :dollar: to ${member.tag}`)
    }
  }