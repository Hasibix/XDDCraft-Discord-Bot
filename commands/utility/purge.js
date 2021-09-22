const { Message } = require('discord.js')

module.exports = {
    name : 'clear',
    aliases: ["purge"],
    permissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    run : async(client, message, args) => {
      const amount = args[0];
      if(!amount) return message.channel.send(`[${client.config.error}] Please type a amount of messages you want to delete!`)
      if(isNaN(amount)) return message.channel.send(`[${client.config.error}] Please type a real amount of messages you want to delete!`)
      if(amount < 5) return message.channel.send(`[${client.config.error}] You can delete **${amount}** message yourself because its too short amount ._.`)
      
      message.channel.bulkDelete(parseInt(amount));
    }
}