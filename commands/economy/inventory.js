const { Client, Message, MessageEmbed } = require('discord.js')
const userMaker = require
module.exports = {
    name : 'inventory',
    category : 'economy',
    aliases : ['inv'],
    description : 'swagshit: money money',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
  const embed = new MessageEmbed()
    .setAuthor(`Inventory of ${message.author.tag}`, message.guild.iconURL)
    .setColor("#A7D28B")
    .setThumbnail()
    .setTimestamp();
  const x = client.db.get(`items_${message.author.id}`);
if(!x) { return message.channel.send(`No Items Found To Display`); }
const arrayToObject = x.reduce((itemsobj, x) => {
    itemsobj[x.name] = (itemsobj[x.name] || 0) + 1;
    return itemsobj;
}, {});
const result = Object.keys(arrayToObject).map(k => embed.addField(`Name: ${k}`,`Quantity: **${arrayToObject[k]}**`, false));
  
 
  return message.channel.send(embed);
    }
}