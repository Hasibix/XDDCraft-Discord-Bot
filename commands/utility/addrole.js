const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    permissions: ["MANAGE_ROLES"],
    run : async(client, message, args) => {

        const target = message.mentions.members.first()
        if(!target) return message.channel.send(`[${client.config.error}] Please specify a user to give role!`)
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send(`[${client.config.error}] Please specify a role to give!`)
        await target.roles.add(role)
        message.channel.send(`[${client.config.success}] Successfully gave ${role} to <@${target.user.id}>!`)
    }
}