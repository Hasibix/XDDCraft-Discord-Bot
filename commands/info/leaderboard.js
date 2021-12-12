//Added by Hasibix#0001
const { Message, Client, MessageEmbed, MessageButton, Collection} = require('discord.js')

module.exports = {
    name : 'leaderboard',
    aliases: ['lb'],
    description : 'bruh',
    usage: "<leaderboard type [eco|lvl]>",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
      const commando = args[0];
      if(!commando) return message.channel.send(`[${client.emoji.error}] Please specify a type of leaderboard! (ex: eco, level/xp)`)
      if(commando === "eco" || commando === "economy") {
        const gms = await message.channel.send(`[${client.emoji.warning}] Fetching.`)
        setTimeout(async() => {
         gms.edit(`[${client.emoji.warning}] Fetching.`)
         gms.edit(`[${client.emoji.warning}] Fetching..`)
         gms.edit(`[${client.emoji.warning}] Fetching...`)
         gms.edit(`[${client.emoji.warning}] Fetching....`)
         gms.edit(`[${client.emoji.warning}] Fetching.....`)
         gms.edit(`[${client.emoji.warning}] Fetching......`)
         gms.edit(`[${client.emoji.warning}] Fetching.........`)
         gms.edit(`[${client.emoji.warning}] Fetching.........`)
         gms.edit(`[${client.emoji.warning}] Fetching......`)
         gms.edit(`[${client.emoji.warning}] Fetching.....`)
         gms.edit(`[${client.emoji.warning}] Fetching....`)
         gms.edit(`[${client.emoji.warning}] Fetching...`)
         gms.edit(`[${client.emoji.warning}] Fetching..`)
         let cms = await message.channel.send(`[${client.emoji.success}] Just a moment..`)
         
         gms.edit(`[${client.emoji.warning}] Fetching.`).then(async() => {
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
        const gms = await message.channel.send(`[${client.emoji.warning}] Fetching.`)
        setTimeout(async() => {
         gms.edit(`[${client.emoji.warning}] Fetching.`)
         gms.edit(`[${client.emoji.warning}] Fetching..`)
         gms.edit(`[${client.emoji.warning}] Fetching...`)
         gms.edit(`[${client.emoji.warning}] Fetching....`)
         gms.edit(`[${client.emoji.warning}] Fetching.....`)
         gms.edit(`[${client.emoji.warning}] Fetching......`)
         gms.edit(`[${client.emoji.warning}] Fetching.........`)
         gms.edit(`[${client.emoji.warning}] Fetching.........`)
         gms.edit(`[${client.emoji.warning}] Fetching......`)
         gms.edit(`[${client.emoji.warning}] Fetching.....`)
         gms.edit(`[${client.emoji.warning}] Fetching....`)
         gms.edit(`[${client.emoji.warning}] Fetching...`)
         gms.edit(`[${client.emoji.warning}] Fetching..`)
         let cms = await message.channel.send(`[${client.emoji.success}] Just a moment..`)
         
         gms.edit(`[${client.emoji.warning}] Fetching.`).then(async() => {
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
          }).join("\n\n"))
      ] })
         })
         
        }, 1000)

        let leaderboard = await client.lvlfetchLeaderboard(message.guild.id, 5);
        let leaderboards = await client.lvlcomputeLeaderboard(client, leaderboard, true)
        
        let embed = new MessageEmbed()
        .setTitle(`Level Leaderboard of ${message.guild.name}`)
        .setDescription(leaderboards)
        .setColor(client.levelsColor)

      }
    }
}