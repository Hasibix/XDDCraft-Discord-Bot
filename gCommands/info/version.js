// Added By KresStew#6666

const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'version',
    category : 'info',
    description : 'Shows The Bot Version',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`⌛ Loading...`)
        const embed = new MessageEmbed()
            .setTitle('Current Bot Version')
            .setDescription(`**Alpha v1.3**\n**~~Alpha v1.4~~**`)
            await message.channel.send(embed)
            msg.delete()
    }
}