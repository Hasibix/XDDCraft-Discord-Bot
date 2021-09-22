const { Client, Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'reactionrole',
    category : 'reactionroles',
    aliases : ['rr', 'reactionroles'],
    description : 'react roli roli',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
      //Start
      message.delete()
        const channel = message.channel.id;
        const roles = message.mentions.roles.first() || args[0];
        var color;
        const emoji = args[1]
         const red = "FF0000";
      const pink = "FFC0CB";
      const purple = "800080";
      const megenta = "FF00E0";
      const green = "008000";
      const lime = "00FF00";
      const black = "000000";
      const grey = "808080";
      const yellow = "FFFF00";
      const orange = "FFA500";
      const brown = "A52A2A";
      const blue = "0000FF";
      const aqua = "00FFFF";
      var color;

      if(args[2] === "red")  { color = red }
      if(args[2] === "pink") { color = pink } else
      if(args[2] === "purple") { color = purple } else
      if(args[2] === "megenta") { color = megenta } else
      if(args[2] === "green") { color = green } else
      if(args[2] === "lime") { color = lime } else
      if(args[2] === "black") { color = black } else
      if(args[2] === "grey") { color = grey } else
      if(args[2] === "yellow") { color = yellow } else
      if(args[2] === "orange") { color = orange } else
      if(args[2] === "brown") { color = brown } else
      if(args[2] === "blue") { color = blue } else
      if(args[2] === "aqua") { color = aqua } else { color = "FF00E0"}
        const text = args.slice(3).join(" ")
        
        const embed = new MessageEmbed()
        .setDescription(text)
        .setColor(`#${color}`);

        let reactableMessage = await message.channel.send({
          embeds: [embed]
          });
        await reactableMessage.react(emoji);

         client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(roles);
                }
            } else return;
            });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(roles);
                }
            } else return; 
            });
    }
}