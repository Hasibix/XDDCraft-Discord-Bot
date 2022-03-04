const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    permissions: ["MANAGE_ROLES"],
        description: "add role to user",
          usages: "<mention member> <mention role>",
category : 'utility',
    run : async(client, message, args) => {

        const target = message.mentions.members.first()
        if(!target) return message.channel.send(`[${client.emoji.error}] Please specify a user to give role!`)
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send(`[${client.emoji.error}] Please specify a role to give!`)
        await target.roles.add(role)
        message.channel.send(`[${client.emoji.success}] Successfully gave ${role} to <@${target.user.id}>!`)
    }
}