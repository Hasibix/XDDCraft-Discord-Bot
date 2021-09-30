	const { Client, Message, MessageEmbed } = require('discord.js');
	
	module.exports = {
			name: 'pm',
      aliases: ["privatemessage", "privatemsg", "pmsg", "dm", "directmessage"],
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    permissions: ["ADMINISTRATOR"],
		run: async(client, message, args) => {
     const mainmessage = args.slice(1).join(" ")
     const target = message.mentions.users.first()
     if(!target) return message.channel.send(`[${client.config.error}] Please mention a user that you want to send a message!`)
     if(!mainmessage) return message.channel.send(`[${client.config.error}] Please type a message to send to that user!`)
     message.channel.send("["+client.config.success+"] Success!")
     try {
       target.send(`A user sent you a message!\n**[${message.author.tag}] >>** ${mainmessage}`)
     } catch (err) {
       console.log(err)
     }
    }
  }