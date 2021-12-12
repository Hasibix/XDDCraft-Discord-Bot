const Discord = require("discord.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord")
const ranko = require("../../models/levels.js")
module.exports = {
  name: "level",
  aliases: ["lvl", "xp", "rank"],
      usage: "No args || <mention member>",
  description: "Show User Level and XP!",
  run: async (client, message, args) => {
    let target = message.guild.members.cache.get(message.mentions.users.first().id).user || message.author;
    let targeto = message.guild.members.cache.get(message.mentions.users.first().id) || message.member;
    
    console.log("user: " + target, "member: " + targeto)
    const user = await client.lvlfetch(message.author.id, message.guild.id, true);
    if(!user) return message.channel.send(`[${client.emoji.error}] You dont have xp! try sending some message (<@${target.id}>)`)

    const needXp = await client.xpFor(parseInt(user.Level) + 1)
    const rank = new canvacord.Rank()
    .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
    .setCurrentXP(user.XP)
    .setLevel(user.Level)
    .setRequiredXP(needXp)
.setProgressBar(client.levelColor, "COLOR")
    .setUsername(target.username)
    .setStatus(targeto.presence.status)
    .setRank(user.position, `RANK #`, true)
    .setDiscriminator(target.discriminator)
    rank.build().then((data) => {
     const attachment = new MessageAttachment(data, "rank.png")
message.channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle(`Rank of ${target.tag}`)
        .setDescription(`**Level:** ${user.Level}\n**XP:** ${user.XP}\n**Guild:** ${message.guild.name}`)
        .setColor(client.levelColor)
        .setImage("attachment://rank.png")
      ],
    files: [attachment]
    })
      
    })
    
  }
}