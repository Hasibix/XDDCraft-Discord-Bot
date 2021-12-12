const ms = require('ms');

const { Client, Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'giveaway',
    aliases : [''],
    description : 'giveaway command!',
      usages: "<command [start|end|reroll]>",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    permissions: ["ADMINISTRATOR"],
    run : async(client, message, args) => {
      if(!args[0]) return;

      if(args[0] === "start") {
          const ms = require('ms');
          const messages = require("../../utils/messages");


        const giveawayChannel = message.mentions.channels.first() || args[1];
        const giveawayDuration = args[2]
        const giveawayWinnerCount = args[3]
        const giveawayPrize = args.slice(4).join(" ")
        
        if(!giveawayChannel) {
            return message.channel.send({
                content: '['+client.emoji.error+'] Enter a valid channel to start giveaway!!'
            });
        }
        if(!giveawayPrize) {
            return message.channel.send({
                content: '['+client.emoji.error+'] Enter a prize for giveaway!!'
            });
        }
       
       
       if(!giveawayDuration) {
            return message.channel.send({
                content: '['+client.emoji.error+'] You must provide a duration of giveaway!'
            });
        }
        if(isNaN(giveawayWinnerCount)) {
            return message.channel.send({
                content: '['+client.emoji.error+'] Winner count must be a number!'
            });
        }
        if(!giveawayWinnerCount) {
            return message.channel.send({
                content: '['+client.emoji.error+'] You must provide numbers of winner in this giveaway'
            });
        }
        
       
       
        // Start the giveaway
        client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            duration: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: parseInt(giveawayWinnerCount),
            // Who hosts this giveaway
            hostedBy: client.emoji.hostedBy ? message.member : null,
            // Messages
            messages
        });
    
         message.channel.send({ content: `[${client.emoji.success}] Giveaway started in ${giveawayChannel}!` });
    

      } else if (args[0] === "end") {
        

 
        const query = args[1]

        // try to found the giveaway with prize then with ID
        const giveaway = 
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return message.channel.send({
                content: '['+client.emoji.error+'] Unable to find a giveaway for `'+ query + '`.'
                
            });
        }

        if (giveaway.ended) {
            return message.channel.send({
                content: '['+client.emoji.error+'] This giveaway is already ended.'
                
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            message.channel.send({ content: '['+client.emoji.success+'] Giveaway ended!' });
        })
        .catch((e) => {
            message.channel.send({
                content: e
                
            });
        });
      } else if(args[0] === "reroll") {
        

        const query = args[1]

        // try to found the giveaway with prize then with ID
        const giveaway = 
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return message.channel.send({
                content: '['+client.emoji.error+'] Unable to find a giveaway for `'+ query +'`.'
            });
        }

        if (!giveaway.ended) {
            return message.channel.send({
                content: '['+client.emoji.error+'] The giveaway is not ended yet.'
            });
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageId)
        .then(() => {
            // Success message
            message.channel.send({content: '['+client.emoji.success+'] Giveaway rerolled!'});
        })
        .catch((e) => {
            message.channel.send({
                content: e
            });
        });

      }
    }
}