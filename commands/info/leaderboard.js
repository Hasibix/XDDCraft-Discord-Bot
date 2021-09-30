//Added by Hasibix#0001
const { Message, Client, MessageEmbed, MessageButton, Collection} = require('discord.js')

module.exports = {
    name : 'leaderboard',
    aliases: ['lb'],
    description : 'bruh',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
      const commando = args[0];
      if(!commando) return message.channel.send(`[${client.config.error}] Please specify a type of leaderboard! (ex: eco, level, items, ranks)`)
      if(commando === "eco" || commando === "economy") {
        const gms = await message.channel.send(`[${client.config.warning}] Fetching.`)
        setTimeout(async() => {
         gms.edit(`[${client.config.warning}] Fetching.`)
         gms.edit(`[${client.config.warning}] Fetching..`)
         gms.edit(`[${client.config.warning}] Fetching...`)
         gms.edit(`[${client.config.warning}] Fetching....`)
         gms.edit(`[${client.config.warning}] Fetching.....`)
         gms.edit(`[${client.config.warning}] Fetching......`)
         gms.edit(`[${client.config.warning}] Fetching.........`)
         gms.edit(`[${client.config.warning}] Fetching.........`)
         gms.edit(`[${client.config.warning}] Fetching......`)
         gms.edit(`[${client.config.warning}] Fetching.....`)
         gms.edit(`[${client.config.warning}] Fetching....`)
         gms.edit(`[${client.config.warning}] Fetching...`)
         gms.edit(`[${client.config.warning}] Fetching..`)
         let cms = await message.channel.send(`[${client.config.success}] Just a moment..`)
         
         gms.edit(`[${client.config.warning}] Fetching.`).then(async() => {
            gms.delete()
            cms.delete()
          const collection = new Collection();

      await Promise.all(
        message.guild.members.cache.map(async (member) => {
          const id = member.id;
          const bal = await client.ecobal(id);
          const bankbal = await client.bankBal(id)
          console.log(member.user.tag +" ----> "+ bal)
          return bal !== 0
          ? collection.set(id, {
            id,
            bal,
            bankbal,
          })
          : null;
        })
      );
      const data = collection.sort((a, b) => b.bal - a.bal).first(10)
      message.channel.send({ embeds: [
        new MessageEmbed()
        .setTitle("Leaderboard of XDDCraft!")
        .setColor("#A7D28B")
        .setDescription(
          data.map((v, i) => {
            return `${i+1}) ${client.users.cache.get(v.id).tag}:\n**Wallet**: ${v.bal} :dollar:\n**Bank**: ${v.bankbal} :dollar:`
          }).join("\n\n")
        )
      ] })
         })
         
        }, 1000)
        
      } else if (commando === "lvl" || commando === "level" || commando === "xp") {
        let leaderboards = await Levels.fetchLeaderboard(message.guild.id, 5);
        
        let embed = new MessageEmbed()
        .setTitle(`Level Leaderboard of ${message.guild.name}`)
        .setColor("#226699")

        for(let leaderboard of leaderboards) {
          embed.addField()
        }

      }
    }
}