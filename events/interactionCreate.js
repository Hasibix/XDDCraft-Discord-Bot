const client = require("../index");
const ticketSchema = require("../models/ticket.js")
const { MessageEmbed } = require("discord.js")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "["+client.emoji.error+"] An error has occured" });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        
       
          cmd.run(client, interaction, args);
        
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
        
    }
   
   ticketSchema.findOne({ Guild: interaction.guild.id, Channel: interaction.channel.id }, async (err, data) => {
            if(data) {
              if(interaction.isButton()) {
              if(interaction.customId === "create_ticket_button" || interaction.customId === "close_ticket_button" || interaction.customId === "lock_ticket_button") {
                const guild = client.guilds.cache.get(data.Guild)
     const channel = guild.channels.cache.get(data.Channel)
    if (interaction.channel.id !== data.Channel) return;
    else {

      if(interaction.user.id !== data.User || interaction.user.bot) return interaction.reply({ content: "Only ticket's opener can use the buttons!", ephemeral: true })
      switch (interaction.customId) {
       case "lock_ticket_button":
         interaction.reply({ content: "You have locked your ticket!", ephemeral: true })
         channel.permissionOverwrites.edit(interaction.user, { SEND_MESSAGES: false });
         client.logger.log(`Ticket: ${interaction.user.tag} locked his/her ticket`)
       break;

       case "close_ticket_button":
          interaction.reply({ content: "Closing your ticket in 5 seconds!", ephemeral: true })
          await client.deleteTicket(data.Code, interaction.guild.id, data.Channel)
         client.logger.log(`Ticket: ${interaction.user.tag} closed his/her ticket`)
       break;

      }

     }
  
    }
            } else return;
            } else return;
   })
   if(interaction.isButton()) {
     switch (interaction.customId) {
       case "create_ticket_button":
       const code = Math.floor(00000 + Math.random() * 90000);
          interaction.reply({ content: `[${client.emoji.warning}] Creating a ticket for you....`, ephemeral: true })
          
          setTimeout(async() => {
            interaction.editReply({ content: `[${client.emoji.success}] Done! Your ticket code is ${code}!`, ephemeral: true })
            await client.createTicketUsingButton(interaction.user.id, interaction.guild.id, code, interaction)
          }, 3000)
          break;
     }
   }
});

