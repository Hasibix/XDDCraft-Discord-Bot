// Added By Hasibix#0001

const { pagination } = require('reconlx')
const { Message, Client, MessageEmbed, MessageButton} = require('discord.js')
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
    name : 'help',
    description : 'bruh',
    usage: "No args || <command name>",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */ 

    run : async(client, message, args) => {
        

    if (!args[0]) {
      let embeds = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
        });

      
        let embed = new MessageEmbed()
.setColor(client.economyColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**\n\n`+
`**${dir.toUpperCase()}**${cmds.length === 0 ? "In progress." : `\`\`\`${cmds.join(",\n")}\`\`\``}`)
.setTimestamp();

      if(dir === "economy") {
        embed.setColor(client.economyColor)
      } else if(dir === "fun") {
        embed.setColor(client.funColor)
      } else if(dir === "giveaway") {
        embed.setColor(client.giveawayColor)
      } else if(dir === "levels") {
        embed.setColor(client.levelColor)
      } else if(dir === "mod") {
        embed.setColor(client.modColor)
      } else if(dir === "music") {
        embed.setColor(client.musicColor)
      } else if(dir === "fun") {
        embed.setColor(client.funColor)
      } else if(dir === "reactionrole") {
        embed.setColor(client.rrColor)
      } else if(dir === "utility") {
        embed.setColor(client.utilityColor)
      } else {
        embed.setColor("RANDOM")
      }
       return embeds.push(embed)
      })
      let timeout = 60000
     pagination({
      author: message.author,
      button: [
      {
        name: "first",
        emoji: "⏪",
        style: "SUCCESS",
      },
      {
        name: "last",
        emoji: "⏩",
        style: "SUCCESS",
      },
    ],
      channel: message.channel,
      embeds: embeds,
      time: timeout,
      fastSkip: true,
    });

    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
       
        return message.channel.send(`[${client.emoji.error}] No results found for **"${args[0]}"**`);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(client.infoColor);
      return message.channel.send({embeds: [embed]});
    }

   

    }
}