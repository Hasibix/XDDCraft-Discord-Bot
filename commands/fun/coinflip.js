//Added By KresStew#6666

const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "coinflip",
    description: "type .coinflip to play the coinflip game",
    run: async(client, message, args) => {
        const choices= ["heads", "tails"];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setDescription(`You flipped **${choice}**!`)
        message.channel.send(embed)
    }
}