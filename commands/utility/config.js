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
      if(!typeOfConfig) {
        const ditch = new MessageEmbed()
        .setTitle("Settings for "+message.guild.name)
        .setDescription('```\nCaptcha,\nMod,\nChatbot,\nTicket,\nFun```')
        .setFooter("By "+message.author.tag)
        .setColor(utilityColor)
        .setTimestamp()
      message.channel.send({
        embeds: [
          ditch
        ]
      })
      return;
      }
      if(typeOfConfig === "captcha") {
        const Schema = require("../../models/captcha")
        const typeOfArgs = args[1];
        if(!typeOfArgs) return message.channel.send(`[${client.config.error}] Please type a settings name to edit!`)
        if(typeOfArgs === "setverifyrole") {
          const role = message.mentions.roles.first();
          message.channel.send(`[${client.config.success}] Successfully set ${role} as the verification/captcha role!`)
          Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
              Role: role.id
            } else {
              new Schema({
                Guild: message.guild.id,
                Role: role.id
              })
            }
          })
        } else if (typeOfArgs === "setmemberrole") {
          const role = message.mentions.roles.first();
          message.channel.send(`[${client.config.success}] Successfully set ${role} as the member role!`)
          Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
              Role2: role.id
            } else {
              new Schema({
                Guild: message.guild.id,
                Role2: role.id
              })
            }
          })
        } else if(typeOfArgs === "setnonverifyrole") {
          const role = message.mentions.roles.first();
          message.channel.send(`[${client.config.success}] Successfully set ${role} as non-verified role!`)
          Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
              Non_VerifyRole: role.id
            } else {
              new Schema({
                Guild: message.guild.id,
                Non_VerifyRole: role.id
              })
            }
          })
        }
      } else if (typeOfConfig === "mod" || typeOfConfig === "moderation") {
        const schema = require("../../models/modlogs")
        const typeOfArgs = args[1];
        if(!typeOfArgs) return message.channel.send(`[${client.config.error}] Please type a settings name to edit!`)
        if(typeOfArgs === "setlogschannel" || typeOfArgs === "setmodlogschannel" || typeOfArgs === "setmodloggingchannel"){
          const channel = message.mentions.channels.first() || message.guild.channels.cache.find(args[2]);
          if(!channel) return message.channel.send(`[${client.config.error}] Please type a channel id mention a channel to set it as audit logs and command logs channel!`)
          schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if(data) data.delete();
            new schema({
              Guild: message.guild.id,
              Channel: channel.id,
            }).save();
            message.channel.send(`[${client.config.success}] Successfully set ${channel} as logs channel!`)
            const djds = await channel.send(`[${client.config.success}] Successfully set this channel as logging channel`)

            setTimeout(async() => {
             djds.delete()
            }, 10000)
          })
        } else if(typeOfArgs === "setmuterole" || typeOfArgs === "setmr"){
          
        }
      } else if(typeOfConfig === "chatbot") {
        const typeOfArgs = args[1]
        if(!typeOfArgs) return message.channel.send(`[${client.config.error}] Please type a settings name to edit!`)
        if(typeOfArgs === "setchannel") {
          const channel = message.mentions.channels.first()
          if(!channel) return message.channel.send(`[${client.config.error}] Please mention a channel to set it as chatbot channel!`)
          let chatbotschema = require("../../models/chat-bot.js")
          chatbotschema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) data.delete()
            new chatbotschema({
              Guild: message.guild.id,
              Channel: channel.id
            }).save()
            message.channel.send(`[${client.config.success}] Successfully set ${channel} as chatbot channel!`)
          })
        }
      }
    }
  }