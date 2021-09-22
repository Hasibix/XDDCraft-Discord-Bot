  const { Client, Message, MessageEmbed } = require('discord.js');
  const db = require("quick.db");
  
	module.exports = {
			name: 'monthly',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    cooldown: 2630000,
    cooldownmsg: "You already claimed your monthly credits! Come back later after `1 month` to claim again!",
		run: async(client, message, args) => {
       const money = Math.floor(Math.random() * 1000000) + 1;

       message.channel.send(`[${client.config.success}] You earned **${money}** :dollar: as monthly credit!`);
       client.addmoney(message.author.id, money);
      
    }
  }