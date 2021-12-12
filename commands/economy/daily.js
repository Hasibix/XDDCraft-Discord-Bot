  const { Client, Message, MessageEmbed } = require('discord.js');
  const db = require("quick.db");
  
	module.exports = {
			name: 'daily',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    cooldown: 43200,
    cooldownmsg: "You already claimed your daily credits! Come back later after `12 hours` to claim again!",
    description: "claim your daily credits!",
		run: async(client, message, args) => {
       const money = Math.floor(Math.random() * 10000) + 1;

       message.channel.send(`[${client.emoji.success}] You earned **${money}** :dollar: as daily credit!`);
       client.addmoney(message.author.id, money);
      
    }
  }