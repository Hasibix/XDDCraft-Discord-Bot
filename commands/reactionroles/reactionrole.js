const { Client, Message, MessageEmbed } = require('discord.js')
const react = require("mongodb-reaction-role");

module.exports = {
    name : 'reactionrole',
    category : 'reactionroles',
    aliases : ['rr', 'reactionroles'],
    description : 'react roli roli',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    permissions: ["ADMINISTRATOR"],
    run : async(client, message, args) => {
      const maincommand = args[0]
      if(!maincommand) return;
      if(maincommand === "create") {
        let role = message.mentions.roles.first() || args[2]
        if(!args[1] || !args[2] || !args[3]) return message.channel.send(`[${client.config.error}] Invalid arguments! (ex: XDDreactionrole create <message id> <mention the role> <emoji>)`)
        if(isNaN(args[1])) return message.channel.send(`[${client.config.error}] Please specify a valid message id!`)

        try {
         let reactionmsg = await message.channel.messages.fetch(args[1])
         reactionmsg.react(args[3])
        } catch (err) {
          return message.channel.send(`[${client.config.error}] The message id is not valid or the message is not in this channel! Make sure that you are running this command in the same channel as the message`)
        }
       await react.createrr(client, message.guild.id, args[1], role.id, args[3], "false");
      message.channel.send(`[${client.config.success}] Successfully created the reaction role!`)
      } else if (maincommand === "delete" || maincommand === "remove") {
        if(!args[1] || !args[2]) return message.channel.send(`[${client.config.error}] Invalid arguments! (ex: XDDreactionrole delete <message id> <emoji>)`)
        if(isNaN(args[1])) return message.channel.send(`[${client.config.error}] Please specify a valid message id!`)
        try {
         message.channel.messages.fetch(args[1])
        } catch (err) {
          return message.channel.send(`[${client.config.error}] The message id is not valid or the message is not in this channel! Make sure that you are running this command in the same channel as the message`)
        }
await react.deleterr(client, message.guild.id ,args[1] , args[2]);
message.channel.send(`[${client.config.success}] Successfully deleted the reaction role!`)
      } else if (maincommand === "edit" || maincommand === "modify") {
       let role = message.mentions.roles.first() || args[2]
       if(!args[1] || !args[2] || !args[3]) return message.channel.send(`[${client.config.error}] Invalid arguments! (ex: XDDreactionrole edit <message id> <mention the new role will be given on reaction> <emoji>)`)
       if(isNaN(args[1])) return message.channel.send(`[${client.config.error}] Please specify a valid message id!`)
       try {
         message.channel.messages.fetch(args[1])
        } catch (err) {
          return message.channel.send(`[${client.config.error}] The message id is not valid or the message is not in this channel! Make sure that you are running this command in the same channel as the message`)
        }
await react.editrr(client, message.guild.id ,args[1] , role.id , args[3]);
message.channel.send(`[${client.config.success}] Successfully edited the reaction role!`)
      }
    },
}
