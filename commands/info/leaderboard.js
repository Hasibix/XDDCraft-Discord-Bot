const { Client, Message, MessageEmbed } = require('discord.js')
const Levels = require('discord-xp')
module.exports = {
    name : 'leaderboard',
    category : 'info',
    aliases : ['lb'],
    description : 'shows the top user in the server',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
      let ecoLeaderboard = client.eco.leaderboard({ limit: 15, raw: false });
      if (!ecoLeaderboard || ecoLeaderboard.length < 1) return message.channel.send("❌ | Empty Leaderboard!");
      const ecoLBEMBED = new MessageEmbed()
        .setTitle(`Richest users in ${message.guild.name}`)
        .setColor("YELLOW")
        .setFooter("This is WALLETs, not net worth")
        .setTimestamp();
       ecoLeaderboard.forEach(u => {
        ecoLBEMBED.addField(`${u.position}. ${u.money} - ${client.users.cache.get(u.id) ? client.users.cache.get(u.id).tag : "Unknown#0000"}`, '=-=-=-=-=-=-=-=-=-=-=');
       });
      

      const rawLevelLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.



      if (rawLevelLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");



      const levelLeaderboard = await Levels.computeLeaderboard(client, rawLevelLeaderboard, true); // We process the leaderboard.



     const levellb = levelLeaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}\n=-=-=-=-=-=-=-=-=-=-=`); // We map the outputs.
      const levelLeaderboardEmbed = new MessageEmbed()
      .setTitle(`Top level users in ${message.guild.name}`)
      .setColor("YELLOW")
      .setDescription(`**\n${levellb.join("\n")}**`)

      if(!args[0]) return message.channel.send("Which type of leaderboard do you want to see??");
      if(args[0] === "xp") return message.channel.send(levelLeaderboardEmbed);
      if(args[0] === "economy") return message.channel.send(ecoLBEMBED);
    }
}