const warnSchema = require('../../models/warns')

module.exports = {
    name : 'delete-warn',
    usage: "<warn id>",
    permissions: ["ADMINISTRATOR"],
    run : async(client, message, args) => {
        if(!args[0]) return message.channel.send(`[${client.emoji.error}] Please type a warn id to delete it!`)
        const data = await warnSchema.findById(args[0])

            if(data) {
              data.delete()
                message.channel.send(`[${client.emoji.success}] Successfully unwarned ${user.tag}!`)
                data.save()
            } else {
                message.channel.send('['+client.emoji.error+'] Please type a valid warn id to delete the warn!')
            }
       

    }
}