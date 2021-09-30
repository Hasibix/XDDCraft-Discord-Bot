const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Ban A Member!",
  permissions: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    //Start
    const Color = 'GREEN';
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send(`[${client.config.error}] I am missing permissions to ban members. [BAN_MEMBERS]`)

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `[${client.config.error}] Please mention a member that you want to ban!`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`[${client.config.error}] Please mention a valid member to ban!`);

    if (Member.id === message.author.id)
      return message.channel.send(`[${client.config.warning}] You can't ban your self!`);

    if (Member.id === client.user.id)
      return message.channel.send(`[:cry:] Please don't ban me ;-;`);

    let Reason = args.slice(1).join(" ");

    try {
      console.log(`Member Is Going To Get Ban!`);
      setTimeout(function() {
        Member.ban(`${Reason || "No Reason Provided!"}`);
      }, 2000);
      if (!Member.bot)
        Member.send(
          `You Have Been Banned From **${message.guild.name}** For ${Reason ||
            "No Reason Lmao"}`
        );
      message.channel.send(`[${client.config.success}] **${Member.tag}** has been banned! Reason: ${Reason || "No Reason Lmfao"}`)
      console.log(
        `User: ${Member.tag} (${Member.id}) Just Got Banned From ${
          message.guild.name
        } For ${Reason || "No Reason Lmao"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `[${client.config.error}] An error occurred!`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
