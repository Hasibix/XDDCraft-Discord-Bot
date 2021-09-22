 const { Client, Message, MessageEmbed } = require('discord.js');

	module.exports = {
			name: 'work',
      cooldown: 3600,
      cooldownmsg: "You are tired rn! Come back later after 1 hour!",
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
		run: async(client, message, args) => {
       const jobs = ["Programmer", "Builder", "Waiter", "Chef", "Bus Driver", "Mechanic", "Doctor", "Twitch Streamer", "Youtuber", "Gamer"];
       const jobIndex = jobs[Math.floor(Math.random() * jobs.length)];
       const money = Math.floor(Math.random() * 1000) + 1;

       message.channel.send(`You worked as **${jobIndex}** and earned **${money}** :dollar:!`);
       client.addmoney(message.author.id, money);
    }
  }