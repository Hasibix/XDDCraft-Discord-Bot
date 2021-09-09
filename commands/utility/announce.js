const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "announce",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.permissions.has("ADMINSTATOR")) message.member.send("You don't have any permissions to send announcements!");
    if(!args[0]) return message.channel.send("Put a type of announcement! ex: announcement, event etc");
    if(!args[1]) return message.channel.send("What announcement do you want to send??")
    if(args[0] === "helps") return message.member.send("**announcement types: \nannouncement, \nevent, \nalert, \nwarning, \nupdate**");
    var announceType;
    if(args[0] === "announcement") return announceType = "ANNOUNCEMENT";
    if(args[0] === "event") { announceType = "EVENT" }
    if(args[0] === "alert")  {announceType = "ALERT"}
    if(args[0] === "warning"){ announceType = "WARNING"}
    if(args[0] === "update")  {announceType = "NEW UPDATE"}
    const announceEmbed = new MessageEmbed()
        .setAuthor("By "+message.author.username, message.author.displayAvatarURL({ dyanmic: true }))
        .setTitle(`||@here|| Here ||@here||`)
        .setDescription(args.slice(1).join(" "))
        .setFooter('Stay home, Stay safe! -XDDCraft Team')
        .setTimestamp()
        .setColor("RED");
    
    message.channel.send("||@everyone|| **"+announceType+"** ||@everyone||", announceEmbed);

  },
};

