  const { Client, Message, MessageEmbed } = require('discord.js');
  const inventory = require("../../models/inventory")
  
  
	module.exports = {
			name: 'inventory',
      aliases: ["inv"],
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/

		run: async(client, message, args) => {
      inventory.findOne({ Guild: message.guild.id, User: message.author.id }, async(err, data) => {
        if(!data) return message.channel.send(`[${client.config.error}] Your inventory is empty!`)
        const mappedData = Object.keys(data.Inventory).map((key) => {
          return `(${data.Inventory[key]}x) ${key[0].toUpperCase()}${key.slice(1).toLowerCase()} ${data.ItemEmoji[key] || "No emoji!"}`
        }).join("\n")
         const inventoryEmbed = new MessageEmbed()
      .setTitle(`${message.author.tag}'s Inventory!`)
      .setDescription(mappedData)
      .setColor("#A7D28B");
      message.channel.send({ embeds: [inventoryEmbed] })
       }
     );
    }
  }