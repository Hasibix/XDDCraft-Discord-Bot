const { Client, Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'balance',
    category : 'economy',
    aliases : ['bal'],
    description : 'swagshit: money money',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

 let user = message.mentions.users.first() || message.author;
    let userBalance = client.eco.fetchMoney(user.id);
    const embed = new MessageEmbed()
        .setTitle(`${user.username}'s Balance`)
        .setDescription(`**Wallet**: ${userBalance.amount} :dollar:\n**Bank**: Not Done!`)
        .setColor("#A7D28B")
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp();
    return message.channel.send(embed);

    }
}