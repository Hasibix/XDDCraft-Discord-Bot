	const { Client, Message, MessageEmbed } = require('discord.js');
	const db = require("quick.db")
	module.exports = {
			name: 'config',
      aliases: ["configuration", "settings", "editconfig", "editsettings"],
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    permissions: ["ADMINISTRATOR"],
		run: async(client, message, args) => {
      const typeOfConfig = args[0];
      if(!typeOfConfig) return message.channel.send(`[${client.config.error}] Please type a group of settings to edit!`);
      if(typeOfConfig === "captcha") {
        const typeOfArgs = args[1];
        if(!typeOfArgs) return message.channel.send(`[${client.config.error}] Please type a settings name to edit!`)
        if(typeOfArgs === "setverifyrole") {
          const role = message.mentions.roles.first();
          message.channel.send(`[${client.config.success}] Successfully set ${role} as the verification/captcha role!`)
          db.set(`verifyRole_${message.guild.id}`, role.id)
        } else if (typeOfArgs === "setmemberrole") {
          const role = message.mentions.roles.first();
          message.channel.send(`[${client.config.success}] Successfully set ${role} as the member role!`)
          db.set(`memberrole_${message.guild.id}`, role.id)
        } else if(typeOfArgs === "setnonverifyrole") {
          const role = message.mentions.roles.first();
          message.channel.send(`[${client.config.success}] Successfully set ${role} as non-verified role!`)
          db.set(`nonverifyrole_${message.guild.id}`, role.id)
        }
      }
    }
  }