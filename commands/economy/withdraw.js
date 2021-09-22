  const { Client, Message, MessageEmbed } = require('discord.js');
 
	module.exports = {
			name: 'withdraw',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
    
		run: async(client, message, args) => {
      const amountToWithdraw = parseInt(args[0]);
      if(!amountToWithdraw) return message.channel.send(`[${client.config.error}] Please enter a amount of money to withdraw from your bank account!`);
      const bankBal = await client.bankBal(message.author.id);
      if(bankbal < args[0]) return message.channel.send(`[${client.config.error}] You dont have **${args[0]}** :dollar: in your bank account to withdraw!`)

      client.addmoney(message.author.id, amountToWithdraw)
      client.bankWithdraw(message.author.id, amountToWithdraw)
      message.channel.send(`[${client.config.success}] Successfully Withdrawed **${amountToWithdraw}** money to from bank account! Now you have ${parseInt(bankBal) - amountToWithdraw} :dollar: in your bank account!`)
    }
  }