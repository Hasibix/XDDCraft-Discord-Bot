const { Client, Message, MessageEmbed } = require('discord.js')
const userMaker = require
module.exports = {
    name : 'work',
    category : 'economy',
    aliases : [],
    description : 'swagshit: money money',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
    let amount = Math.floor(Math.random() * 1500) + 1000;
    let work = client.eco.work(client.ecoAddUser, amount);
    if (work.onCooldown) return message.reply(`You are tired rn. Come back after ${work.time.minutes} minutes & ${work.time.seconds} seconds to work again.`);
    else return message.reply(`You worked as **${work.workedAs}** and earned **${work.amount}** 💸. Now you have **${work.after}** 💸.`);
    }
}