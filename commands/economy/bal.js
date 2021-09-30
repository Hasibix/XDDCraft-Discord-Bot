	const { Client, Message, MessageEmbed } = require('discord.js');
			
	module.exports = {
			name: 'bal',
      aliases : ['balance'],
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
		run: async(client, message, args) => {
      const member = message.mentions.users.first() || message.author
     const bal = await client.ecobal(member.id);
     const bankBal = await client.bankBal(member.id)
     const balEmbed = new MessageEmbed()
     .setTitle(`${member.tag}'s balance`)
     .setColor(client.economyColor)
     .setDescription(`Wallet: ${parseInt(bal)} :dollar:\nBank: ${parseInt(bankBal)} :dollar:`);
     message.channel.send({ embeds: [balEmbed] });
    }
  }