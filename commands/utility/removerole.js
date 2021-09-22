const { Message } = require('discord.js')

module.exports = {
    name : 'removerole',
    permissions: ["MANAGE_ROLES"],
    run : async(client, message, args) => {

        const target = message.mentions.members.first()
        if(!target) return message.channel.send(`[${client.config.error}] Please specify a user to remove role!`)
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send(`[${client.config.error}] Please specify a role to remove!`)
        await target.roles.add(role)
        message.channel.send(`[${client.config.success}] Successfully removed <@${role}> from <@${target.user.id}>!`)
    }
}