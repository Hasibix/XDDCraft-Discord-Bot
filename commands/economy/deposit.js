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
      if(userBal < 500) return message.channel.send(`[${client.config.error}] You must have atleast 500 :dollar: to deposit in your bank account!`)
      if(args[0] < 500) return message.channel.send(`[${client.config.error}] You must atleast deposit 500 :dollar: or more in your bank account!`)
      if(userBal < args[0]) return message.channel.send(`[${client.config.error}] You dont have **${args[0]}** :dollar: in your wallet to deposit it in your bank account!`)
      
      client.rmvmoney(message.author.id, amountToDeposit)
      client.bankDeposit(message.author.id, amountToDeposit)
      message.channel.send(`[${client.config.success}] Successfully deposited **${amountToDeposit}** money to your bank account! Now you have ${parseInt(bankBal) + amountToDeposit} :dollar: in your bank account!`)
    }
  }