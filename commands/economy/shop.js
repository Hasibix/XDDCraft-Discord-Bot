  const { Client, Message, MessageEmbed } = require('discord.js');
  const db = require("quick.db");
  
	module.exports = {
			name: 'shop',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/

		run: async(client, message, args) => {
    message.channel.send("Comming soon!")
    }
  }