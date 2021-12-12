const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  aliases: ["about", "whois"],
  usage: "No args || <mention member>",
  description: "Show User Information!",
  run: async (client, message, args) => {
    let Member = message.mentions.members.first() || message.member;
    const devices = Member.presence?.clientStatus || {};

    const statuses = {
      online: "Online <:online:884115580213428306>",
      dnd: "Do Not Disturb <:dnd:884115579584249978>",
      idle: "Idle <:idle:884115580074983514>",
      offline: "Offline/Invisible <:offline_or_invisible:884115580200820786>",
      streaming: "Streaming <:streaming:888728421524443149>"
    };
    const embedColor = {
      online: "#43B581",
      dnd: "#F04747",
      idle: "#FAA61A",
      offline: "#747F8D",
      streaming: "PURPLE"
    };
    
    const deviceField = () => {
        const entries = Object.entries(devices)
        .map((value, index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`)
        return `${entries || "Not online!"}`;
    }
    var presence = Member.presence.activities.filter(x=>x.type === "PLAYING")//outputs the presence which the user is playing

    const embed = new MessageEmbed()
      .setTitle(Member.user.tag + " Information!")
      .setColor(embedColor[Member.presence.status])
      .setThumbnail(Member.user.displayAvatarURL())
      .setDescription(`Name: ${Member.user.tag}\nID: ${Member.id}\nStatus: ${statuses[Member.presence.status]}\nRoles Count: ${message.guild.members.cache.get(Member.user.id).roles.cache.size ||
          "No Roles!"}\nAvatar Url: [Link](${Member.user.displayAvatarURL()})\nJoined Server At: ${Member.joinedAt.toDateString()}\nJoined Discord At: ${Member.user.createdAt.toDateString()}\nActivity: ${presence && presence.length ? presence[0].name : 'None'}\nDevices: \n${deviceField()}\n\n`)
     
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send({
      embeds: [embed]
      });

    //End
  }
};