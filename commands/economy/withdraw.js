  const { Client, Message, MessageEmbed } = require('discord.js');
 
	module.exports = {
			name: 'withdraw',
			/**
			* @param {Client} client 
			* @param {Message} message 
			* @param {String[]} args 
			*/
        usages: "<amount>",
    description: "withdraw money from your bank account",
		run: async(client, message, args) => {
      const amountToWithdraw = parseInt(args[0]);
      if(!amountToWithdraw) return message.channel.send(`[${client.emoji.error}] Please enter a amount of money to withdraw from your bank account!`);
      const bankBal = await client.bankBal(message.author.id);
      if(bankBal < args[0]) return message.channel.send(`[${client.emoji.error}] You dont have **${args[0]}** :dollar: in your bank account to withdraw!`)

      client.addmoney(message.author.id, amountToWithdraw)
      client.bankWithdraw(message.author.id, amountToWithdraw)
      message.channel.send(`[${client.emoji.success}] Successfully Withdrawed **${amountToWithdraw}** money to from bank account! Now you have ${parseInt(bankBal) - amountToWithdraw} :dollar: in your bank account!`)
    }
  }