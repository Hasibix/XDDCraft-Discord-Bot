const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: "announce",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  description: "Send announcementz",
  category : 'utility',
  permissions: ["ADMINISTRATOR"],
  usage: "<type [announcement|event|alert|warning|update]> <text>",
  run: async (client, message, args) => {

    if(!args[0]) return message.channel.send("Put a type of announcement! ex: announcement, event etc");
    if(!args[1]) return message.channel.send("What announcement do you want to send??")
    if(args[0] === "helps") return message.member.send("**announcement types: \nannouncement, \nevent, \nalert, \nwarning, \nupdate**");
    var announceType;
    if(args[0] === "announcement") { announceType = "ANNOUNCEMENT" }
    if(args[0] === "event") { announceType = "EVENT" }
    if(args[0] === "alert")  {announceType = "ALERT"}
    if(args[0] === "warning"){ announceType = "WARNING"}
    if(args[0] === "update")  {announceType = "NEW UPDATE"}
    const announceEmbed = new MessageEmbed()
        .setAuthor(`By ${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`||@here|| Here ||@here||`)
        .setDescription(args.slice(1).join(" "))
        .setFooter('Stay home, Stay safe! -XDDCraft Team')
        .setTimestamp()
        .setColor("RED");
    
     message.channel.send({
      content: "@everyone **"+announceType+"** @everyone",
      embeds: [announceEmbed]
    });

  },
};

