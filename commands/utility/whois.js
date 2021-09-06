const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  aliases: ["about", "whois"],
  description: "Show User Information!",
  usage: "Userinfo | <Mention User>",
  run: async (client, message, args) => {
    let Member = message.mentions.members.first() || message.member;

    const statuses = {
      online: "Online",
      dnd: "Do Not Disturb",
      idle: "Idle",
      offline: "Offline/Invisible"
    };
    const embed = new MessageEmbed()
      .setTitle(Member.user.tag + " Information!")
      .setColor("RANDOM")
      .setThumbnail(Member.user.displayAvatarURL())
      .addField("Name", Member.user.tag, true)
      .addField("ID", `${Member.id}`, true)
      .addField("Status", statuses[Member.presence.status], true)
      .addField(
        `Roles Count`,
        message.guild.members.cache.get(Member.user.id).roles.cache.size ||
          "No Roles!",
        true
      )
      .addField(`Avatar Url`, `[Link](${Member.user.displayAvatarURL()})`, true)
      .addField("Joined Server At", Member.joinedAt.toDateString())
      .addField("Joined Discord At", Member.user.createdAt.toDateString())
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};