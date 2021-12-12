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
       usages: "No args || <mention member>",
      usages: "check your or any other member's inventory",

		run: async(client, message, args) => {
      const user = message.mentions.users.first() || message.author;
      inventory.findOne({ Guild: message.guild.id, User: user.id }, async(err, data) => {
        if(!data) return message.channel.send(`[${client.emoji.error}] Your inventory is empty!`)
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