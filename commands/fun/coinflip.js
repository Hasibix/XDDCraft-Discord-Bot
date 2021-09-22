//Added By KresStew#6666

const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "coinflip",
    description: "type .coinflip to play the coinflip game",
    run: async(client, message, args) => {
      const member = message.author;
        const choices= ["heads", "tails"];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        const choiceImages= ["https://media.discordapp.net/attachments/887375212763553802/887596715178336256/coinheads.png?width=406&height=406", "tails"];
        const choiceImage = choiceImages[Math.floor(Math.random() * choiceImages.length)];
        
        const choiceType = args[0]
        const moneyArg = args[1];
        const money = moneyArg * 2;
        if(!choiceType) return message.channel.send(`[${client.config.error}] Please type a real choice. (ex: head, tails)`)
        if(!moneyArg) return message.channel.send(`[${client.config.error}] Please type a amount of money you want to bet!`)
        var wonOrLose;

        if(choice === "heads") {
             if(choiceType !== choice) {
          let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setThumbnail("https://media.discordapp.net/attachments/887375212763553802/887596715178336256/coinheads.png?width=406&height=406")
        .setDescription(`You flipped **${choice}** and lose **${moneyArg}** ;-;`)
        message.channel.send({embeds: [embed]})
        client.rmvmoney(member.id, parseInt(moneyArg))
        } else if(choiceType === choice){
         let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setThumbnail("https://media.discordapp.net/attachments/887375212763553802/887596715178336256/coinheads.png?width=406&height=406")
        .setDescription(`You flipped **${choice}** and won **${money}**!`)
        message.channel.send({embeds: [embed]})
        client.addmoney(message.author.id, money);
        } 
        } else if (choice === "tails") {
             if(choiceType !== choice) {
          let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setThumbnail("https://media.discordapp.net/attachments/887375212763553802/887596713433518140/cointails.png?width=406&height=406")
        .setDescription(`You flipped **${choice}** and lose **${moneyArg}** ;-;`)
        message.channel.send({embeds: [embed]})
        client.rmvmoney(member.id, parseInt(moneyArg))
        } else if(choiceType === choice){
         let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setThumbnail("https://media.discordapp.net/attachments/887375212763553802/887596713433518140/cointails.png?width=406&height=406")
        .setDescription(`You flipped **${choice}** and won **${money}**!`)
        message.channel.send({embeds: [embed]})
        client.addmoney(message.author.id, money);
        }
        } else {
          message.channel.send(`[${client.config.warning}] Oh you really want to flip your coin by **${args[0]}**?`)
          return;
        }
        
        
    }
}