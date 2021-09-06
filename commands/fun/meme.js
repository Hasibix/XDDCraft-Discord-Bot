//Added By KresStew#6666

const discord = require('discord.js')
const randompuppy = require('random-puppy')
module.exports = {
    name: "meme",
    description: "gives you a meme",
    run: async(client, message, args) => {
        const meme = ["meme", "dankmeme", "discordmeme","memes", "dankmemes"]
        const random = meme[Math.floor(Math.random() * meme.length)]

        const image = await randompuppy(random)
        let embed = new discord.MessageEmbed()
        .setTitle("Meme")
        .setImage(`${image}`)
        .setTimestamp()
        await message.channel.send(embed)
    }
}