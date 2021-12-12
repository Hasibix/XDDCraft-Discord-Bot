const { Client, Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'addmoney',
    category : 'economy',
    aliases : ['am'],
    description : 'swagshit: money money',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
       
    let user = message.mentions.users.first();
    if (!user) return message.channel.send("Please specify a user!");
    let amount = args[1];
    if (!amount || isNaN(amount)) return message.reply("Please specify a valid amount.");
    let data = client.eco.addMoney(user.id, parseInt(amount));
    const embed = new MessageEmbed()
        .setTitle(`Money Added!`)
        .addField(`User`, `<@${data.user}>`)
        .addField(`Balance Given`, `${data.amount} 💸`)
        .addField(`Total Amount`, data.after)
        .setColor("#A7D28B")
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp();
    return message.channel.send(embed);
    }
}