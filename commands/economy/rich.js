const { Client, Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'rich',
    category : 'economy',
    aliases : [],
    description : 'swagshit: money money',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {


let leaderboard = client.eco.leaderboard({ limit: 15, raw: false });
    if (!leaderboard || leaderboard.length < 1) return message.channel.send("❌ | Empty Leaderboard!");
    const embed = new MessageEmbed()
        .setTitle(`Richest users in ${message.guild.name}`)
        .setColor("YELLOW")
        .setFooter("This is WALLETs, not net worth")
        .setTimestamp();
    leaderboard.forEach(u => {
        embed.addField(`${u.position}. ${u.money} - ${client.users.cache.get(u.id) ? client.users.cache.get(u.id).tag : "Unknown#0000"}`, '=-=-=-=-=-=-=-=-=-=-=');
    });
    return message.channel.send(embed);
}
}