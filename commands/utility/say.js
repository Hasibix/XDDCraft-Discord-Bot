const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  usages: "<message>",
  description: "type a message and i will say it!",
  run: async (client, message, args) => {
    if(!args[0]) return message.channel.send(`[${client.emoji.error}] Please type a message to send!`)
    message.channel.send(args.join(" "))
  },
};
