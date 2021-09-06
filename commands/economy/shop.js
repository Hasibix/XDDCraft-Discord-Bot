const { Client, Message, MessageEmbed } = require('discord.js')
const userMaker = require
module.exports = {
    name : 'shop',
    category : 'economy',
    aliases : ['market', 'store'],
    description : 'swagshit: money money',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
  let items = Object.keys(client.shop);
  let content = "";
  
  for (var i in items) {
    content += `${items[i]} - :dollar: ${client.shop[items[i]].cost}\n`
  }
  
  let embed = new MessageEmbed()
  .setTitle("Store")
  .setDescription(content)
  .setColor("BLURPLE")
  .setFooter("Do :?buy <item> to purchase the item.")
  return message.channel.send(embed);
    }
}