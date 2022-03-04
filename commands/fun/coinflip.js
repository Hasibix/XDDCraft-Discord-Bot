const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "coinflip",
    description: "type XDDcoinflip to play the coinflip game",
    usages: "<choice [heads, tails]> <amount of money to bet>",

    run: async(client, message, args) => {
      const member = message.author;
        const choices = [
          {
            name: "heads",
            image: "https://media.discordapp.net/attachments/887375212763553802/887596715178336256/coinheads.png?width=406&height=406"
          },
          {
            name: "tails",
            image: "https://media.discordapp.net/attachments/887375212763553802/887596713433518140/cointails.png?width=406&height=406"
          }
        ];
        const choiceNames = [
          "heads",
          "tails"
        ]
        const choose = choiceNames[Math.floor(Math.random() * choiceNames.length)];
 
        const validItems = !!choices.find((val) => val.name.toLowerCase() === args[0].toLowerCase()).toString();
      if(!validItems) return message.reply(`[${client.emoji.error}] You can only flip your coin heads or tails only!`)

        const finalChoice = choose.toLowerCase();

        const choiceimage = choices.find((val) => val.name.toLowerCase() === choose.toLowerCase()).image.toString();
        const choiceType = args[0]
        const moneyArg = args[1];
        const money = moneyArg * 2;
        if(!choiceType) return message.channel.send(`[${client.emoji.error}] Please type a real choice. (ex: head, tails)`)
        if(!moneyArg) return message.channel.send(`[${client.emoji.error}] Please type a amount of money you want to bet!`)
        
        const playersmoney = await client.ecobal(message.author.id);

         if (playersmoney < moneyArg) return message.channel.send(`[${client.emoji.error}] You dont have **${moneyArg}** :dollar: to bet!`) 

        if(choiceType !== choose) {
          client.rmvmoney(member.id, parseInt(moneyArg));
          const currentmoney = await client.ecobal(message.author.id);
          const currmoney = currentmoney - moneyArg; 
          let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setThumbnail(choiceimage)
        .setDescription(`It's **${choose}**\nYou lose **${moneyArg}** :dollar: ;-;\nNow you have **${currmoney.toString()}** :dollar:`)
        message.channel.send({embeds: [embed]})
        } else if(choiceType === choose){
        client.addmoney(message.author.id, money);
        const currentmoney = await client.ecobal(message.author.id);
          const currmoney = currentmoney + money; 
         let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setThumbnail(choiceimage)
        .setDescription(`It's **${choose}**\nYou won **${money}** :dollar:!\nNow you have **${currmoney.toString()}** :dollar:`)
        message.channel.send({embeds: [embed]})
        } 
        
        
        
        
    }
}