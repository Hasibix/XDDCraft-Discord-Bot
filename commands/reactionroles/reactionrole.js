const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'reactionrole',
    category : 'reactionroles',
    aliases : ['rr', 'reactionroles'],
    description : 'reaction',
    usage: '<command [Do XDDrr help to see commands!]>',
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
        
    const rrcreate = async(client, message, args) => {
      let role = message.mentions.roles.first() || args[3]
        if(!args[1] || !args[2] || !args[3] || !args[4]) return message.channel.send(`[${client.emoji.error}] Invalid arguments! (ex: XDDreactionrole create <message id> <emoji> <mention the role> <send dm after giving role or not? [true/false]>)`)
        if(isNaN(args[1])) return message.channel.send(`[${client.emoji.error}] Please specify a valid message id!`)

        try {
         let reactionmsg = await message.channel.messages.fetch(args[1])
         reactionmsg.react(args[2])
        } catch (err) {
          return message.channel.send(`[${client.emoji.error}] The message id is not valid or the message is not in this channel! Make sure that you are running this command in the same channel as the message`)
        }


        if(args[4] === "true") {
         client.createRR(message.guild.id, message.channel.id, args[1], args[2], role.id, true, message)
       } else if (args[4] === "false") {
         client.createRR(message.guild.id, message.channel.id, args[1], args[2], role.id, false, message)
       } else {
         message.channel.send(`[${client.emoji.error}] Please type a valid dm type [true or false]!`)
         return;
       }
     
    }
        rrcreate(client, message, args)
      } else if (maincommand === "delete" || maincommand === "remove") {
        const rrdelete = async(client, message, args) => {
      if(!args[1] || !args[2]) return message.channel.send(`[${client.emoji.error}] Invalid arguments! (ex: XDDreactionrole delete <message id> <emoji>)`)
        if(isNaN(args[1])) return message.channel.send(`[${client.emoji.error}] Please specify a valid message id!`)
        try {
         const unreactionmessage = await message.channel.messages.fetch(args[1])
        } catch (err) {
          return message.channel.send(`[${client.emoji.error}] The message id is not valid or the message is not in this channel! Make sure that you are running this command in the same channel as the message`)
          console.log(err)
        }
      client.deleteRR(message.guild.id, message.channel.id, args[1], args[2], message)
    }

        rrdelete(client, message, args)
      } else if (maincommand === "edit" || maincommand === "modify") {
        
       const rredit = async(client, message, args) => {
      if(!args[1] || !args[2] || !args[3] || !args[4]) return message.channel.send(`[${client.emoji.error}] Invalid arguments! (ex: XDDreactionrole edit <message id> <emoji> [dm/role]: [dm true/false or mention new role after "role:"])`)
       if(isNaN(args[1])) return message.channel.send(`[${client.emoji.error}] Please specify a valid message id!`)
       try {
         message.channel.messages.fetch(args[1])
        } catch (err) {
          return message.channel.send(`[${client.emoji.error}] The message id is not valid or the message is not in this channel! Make sure that you are running this command in the same channel as the message`)
        }
     if(args[3] === "dm:") {
       if(!args[4]) return message.channel.send(`[${client.emoji.error}] Please specify a dm type (ex: dm: true/false)`)
       if(args[4] === "true") {
         client.editRRdm(message.guild.id, message.channel.id, args[1], args[2], true, message)
       } else if(args[4] === "false") {
         client.editRRdm(message.guild.id, message.channel.id, args[1], args[2], false, message)
       } else {
         return message.channel.send(`[${client.emoji.error}] Please specify a valid dm type to set for the reaction role! [message: ${args[1]}, emoji: ${args[2]}]`)
       }
     } else if (args[3] === "role:") {
       let role = message.mentions.roles.first() || args[4]
       if(!role) return message.channel.send(`[${client.emoji.error}] Please mention the new role to give in that emoji!`)
       if(role) {
         client.editRRRole(message.guild.id, message.channel.id, args[1], args[2], role.id, message)
       }
     }
      
    }

        rredit(client, message, args)
      } else if (maincommand === "list") {
       const rrlist = async (client, message, args) => {
  if(message.member.permissions.has("ADMINISTRATOR")) {
          if(args[1]) {
          if(isNaN(args[1])) return message.channel.send(`[${client.emoji.error}] Please specify a valid guild id if you want to see another guild's reaction roles or dont type any id to see this guild's reaction roles!`)
          try {
            client.guilds.cache.get(args[1])
          } catch (error) {
            message.channel.send(`[${client.emoji.error}] Invalid guild id! Or i am not in that guild.`)
          }
          client.fetchAllReactionRoles(args[1], client, message)
        } else {
          client.fetchAllReactionRoles(message.guild.id, client, message)
        }
        } else {
         if(args[1]) {
           return message.channel.send(`[${client.emoji.error}] You dont have permissions to see other guild's reaction roles list! [ADMINISTRATOR]`)
         } else {
           client.fetchAllReactionRoles(message.guild.id, client, message)
            
         }
        }
}

        rrlist(client, message, args)
      } else if(maincommand === "help") {
        let embed = new MessageEmbed().setColor(client.rrColor).setTitle(`${client.user.tag} reaction role commands help!`).setDescription("```\nHelp, Create, Delete, Edit, List\n```").setFooter("Note: You cant use XDDrr help (command name) because sadly we cant provide informations of these commands!")

        message.channel.send({
          embeds: [embed]
        })
      }
    },
}
