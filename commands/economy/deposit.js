  const { Client, Message, MessageEmbed } = require('discord.js');
 
	module.exports = {
			name: 'deposit',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    
		run: async(client, message, args) => {
      const amountToDeposit = parseInt(args[0]);
      if(!amountToDeposit) return message.channel.send(`[${client.config.error}] Please enter a amount of money to deposit in your bank account!`);
      const bankBal = await client.bankBal(message.author.id);
      const userBal = await client.ecobal(message.author.id);
      if(userBal < 500) return message.channel.send(`[${client.config.error}] You must have atlest 500 :dollar: to deposit in your bank account!`)
      client.rmvmoney(message.author.id, amountToDeposit)
      client.bankDeposit(message.author.id, amountToDeposit)
      message.channel.send(`[${client.config.success}] Successfully deposited **${amountToDeposit}** money to your bank account! Now you have ${parseInt(bankBal) + amountToDeposit} :dollar: in your bank account!`)
    }
  }