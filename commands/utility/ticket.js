const { Permissions, MessageButton, MessageEmbed, MessageActionRow } = require('discord.js');
const ticketSchema = require("../../models/ticket.js")

module.exports = {
  name: "ticket",
  aliases: [],
  description: "tickets!",
  usage: '<command [Do XDDticket help to see commands!]>',
  run : async(client, message, args) => {
    let comandd = args[0]
    if(!comandd) {
      if(!message.member.permissions.has("ADMINISTRATOR")) return;
      
      const embed = new MessageEmbed()
      .setTitle("Tickets for XDDCraft")
      .setDescription("To create a ticket click on the button given below. Admins/Staffs will contact you soon.")
      .setFooter(`Stay home, Stay safe! - XDDCraft Team`, client.user.displayAvatarURL({ dynamic: false })).setColor(client.utilityColor)

       const row = new MessageActionRow().addComponents(
      new MessageButton()
    .setLabel("Create ticket")
    .setStyle("SECONDARY")
    .setEmoji("📩")
    .setCustomId("create_ticket_button")
       )
    message.channel.send({
      embeds: [embed],
      components: [row]
    })
    }
    
    

    if(comandd === "create" || comandd === "open" || comandd === "opennew") {
      let ticket = Math.floor(00000 + Math.random() * 90000);
    
      let noway = await message.channel
      .send(`[${client.emoji.warning}] Creating a ticket for you....`)
      
      setTimeout(async() => {
       noway.edit(`[${client.emoji.success}] Done! Your ticket code is ${ticket}!`).then((msg) => {
        setTimeout(() => msg.delete(), 13000);
        setTimeout(() => message.delete(), 10000);
      })
      .catch((err) => {
        throw err;
      });
         await client.createTicket(message.author.id, message.guild.id, ticket, message)
      
      }, 3000)

    } else if (comandd === "delete" || comandd === "close") {
      ticketSchema.findOne({ Guild: message.guild.id, Code: args[1] }, async(err, data) => {
       if(data) {
         if(message.author.id !== data.User || !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`[${client.emoji.error}] You dont have permission to delete anyone's tickets! You can only delete your tickets!`)

         client.deleteTicket(args[1], message.guild.id, data.Channel)
         message.channel.send(`[${client.emoji.success}] Successfully deleted the ticket #${args[1]}!`)
       } else return message.channel.send(`[${client.emoji.error}] Theres no ticket in this guild with code: ${args[1]}! Make sure you are in same guild as the ticket code and a specify valid ticket code`)
        
       
      })
     
    } else if (comandd === "list") {
      client.listTicket(message.guild.id, message)
    } else if(comandd === "help") {
        let embed = new MessageEmbed().setColor(client.utilityColor).setTitle(`${client.user.tag} reaction role commands help!`).setDescription("```\nHelp, Create, Delete, List\n```").setFooter("Note: You cant use XDDticket help (command name) because sadly we cant provide informations of these commands!")

        message.channel.send({
          embeds: [embed]
        })
      }
  },
};
