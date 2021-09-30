  const { Client, Message, MessageEmbed } = require('discord.js');
  const items = require('../../models/shopItems')

	module.exports = {
			name: 'shop',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/

		run: async(client, message, args) => {
      if(items.length === 0 ) return message.channel.send(`[${client.config.error}] There is no item in shop!`)

      const shopList = items
      .map((value, index) => {
        return `**${index+1})**\nName: ${value.item[0].toUpperCase()}${value.item.slice(1).toLowerCase()} ${value.emoji || "No Emoji Of This Item!"}\nPrice: ${value.price} :dollar:`
      }).join("\n\n")
      
      const shopEmbed = new MessageEmbed()
      .setTitle("XDDCraft Economy Shop :shopping_cart:!")
      .setColor("#A7D28B")
      .setFooter("Requested by "+ message.author.tag)
      .setDescription(`${shopList}`)
      .setTimestamp();
      message.channel.send({ embeds: [shopEmbed] })
    }
  }