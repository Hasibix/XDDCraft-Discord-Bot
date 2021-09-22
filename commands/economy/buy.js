  const { Client, Message, MessageEmbed } = require('discord.js');
  const inventory = require("../../models/inventory")
  const items = require("../../models/shopItems")

	module.exports = {
			name: 'buy',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/

		run: async(client, message, args) => {
      if(!args[0]) return message.channel.send(`[${client.config.error}] Please specify a item to buy! Type XDDshop for info! And XDDshop {item-name} for more informations!`)
      const itemToBuy = args[0].toLowerCase();
     
      const validItems = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
      if(!validItems) return message.reply(`[${client.config.error}] The item you wanted to buy is not valid!`)
      const itemEmoji = items.find((val) => (val.item.toLowerCase()) === itemToBuy).emoji;

      const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;

      const userBalance = await client.ecobal(message.author.id)
      if(userBalance < itemPrice) return message.channel.send(`[${client.config.error}] You dont have enough balance in your wallet to buy this item! [item: **${itemToBuy}**]`)

      const params = {
        Guild: message.guild.id,
        User: message.author.id
      }
      inventory.findOne(params, async(err, data) => {
        if(data) {
          const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
          if(!hasItem) {
            data.Inventory[itemToBuy] = 1;
            data.ItemEmoji[itemToBuy] = itemEmoji;
          } else {
            data.Inventory[itemToBuy]++
          }
          console.log(data);
          await inventory.findOneAndUpdate(params, data)
        } else {
          new inventory({
            Guild: message.guild.id,
            User: message.author.id,
            ItemEmoji: {
             [itemToBuy]: itemEmoji
            },
            Inventory: {
              [itemToBuy]: 1
            }
          }).save();
        }
      message.reply(`[${client.config.success}] You have successfully bought **${itemToBuy[0].toUpperCase()}${itemToBuy.slice(1).toLowerCase()}** ${itemEmoji} for ${itemPrice} :dollar:!`)
      client.rmvmoney(message.author.id, itemPrice)
      });
    }
  }