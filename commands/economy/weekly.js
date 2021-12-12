  const { Client, Message, MessageEmbed } = require('discord.js');
  const db = require("quick.db");
  
	module.exports = {
			name: 'weekly',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    cooldown: 604800,
    cooldownmsg: "You already claimed your weekly credits! Come back later after `1 week` to claim again!",
     description: "claim your weekly credits!",
		run: async(client, message, args) => {
       const money = Math.floor(Math.random() * 100000) + 1;

       message.channel.send(`[${client.emoji.success}] You earned **${money}** :dollar: as weekly credit!`);
       client.addmoney(message.author.id, money);
      
    }
  }