const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "embed",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
      description: "type a message and i will say it as embed",
  permissions: ["ADMINISTRATOR"],
    usages: "<message>",
  run: async (client, message, args) => {
    if(!args[0]) return message.channel.send(`[${client.emoji.error}] Please type a message to send as embed!`)
    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setDescription(args.join(" "))
        .setColor(client.utilityColor)
        .setFooter('Stay home, Stay safe! -XDDCraft Team')
        .setTimestamp()
      ]
    })
    message.delete()
  },
};
