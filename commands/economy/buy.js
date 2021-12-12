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
      usages: "<item> || <item> <amount>",
    description: "buy an item from shop",
		run: async(client, message, args) => {
      if(!args[0]) return message.channel.send(`[${client.emoji.error}] Please specify a item to buy! Type XDDshop for info! And XDDshop {item-name} for more informations!`)
      const itemToBuy = args[0].toLowerCase();
      const amount = args[1] || 1;
      if(args[1] === "0") return message.channel.send(`[${client.emoji.error}] Bruh. You cant buy item **0x** **${args[0][0].toUpperCase()}${args[0].slice(1).toLowerCase()}**! You must atleast buy 1 item or just use XDDbuy (item) to buy that item 1x!`)
      if(args[1]) {
        if(isNaN(args[1])) return message.channel.send(`[${client.emoji.error}] Bruh. If you want to buy the item in a specified amount, then the amount must be a number! And not a word/letter! You can use only XDDbuy (item) to buy 1x (item)!`)
      }
        const validItems = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
      if(!validItems) return message.reply(`[${client.emoji.error}] The item you wanted to buy is not valid!`)
      const itemEmoji = items.find((val) => (val.item.toLowerCase()) === itemToBuy).emoji;

      const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;

      const userBalance = await client.ecobal(message.author.id)
      if(userBalance < itemPrice) return message.channel.send(`[${client.emoji.error}] You dont have enough balance in your wallet to buy this item! [item: **${itemToBuy}**]`)

      const params = {
        Guild: message.guild.id,
        User: message.author.id
      }
      inventory.findOne(params, async(err, data) => {
        if(data) {
          const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
          if(!hasItem) {
            data.Inventory[itemToBuy] = amount;
            data.ItemEmoji[itemToBuy] = itemEmoji;
          } else {
            data.Inventory[itemToBuy] += parseInt(amount)
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
              [itemToBuy]: amount
            }
          }).save();
        }
      message.reply(`[${client.emoji.success}] You have successfully bought **${amount}x** **${itemToBuy[0].toUpperCase()}${itemToBuy.slice(1).toLowerCase()}** ${itemEmoji} for ${itemPrice} :dollar:!`)
      client.rmvmoney(message.author.id, itemPrice)
      });
      
    } 
  }
