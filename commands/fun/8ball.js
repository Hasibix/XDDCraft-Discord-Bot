const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "8ball",
  aliases: ['8b'],
  description: "balls only!",
    usages: "<question (dont forgot \"?\" lmao)>",

  run: async (client, message, args) => {
   if((/\?$/).test(args.join(' ')) == false) return message.channel.send('[:rofl:] Please ask an actual question. Questions end with \"?\" if you didnt know lmfao')
let replies = ['Yes!', 'Totally!', 'No.', 'Hmm it seems you\'re question was too dumb for me..', 'ask again later i dont wanna talk to you', 'EEEEEE', 'die'];
let answer = replies[Math.floor(Math.random() * replies.length)]

message.channel.send({
  embeds: [
new MessageEmbed()
  .setColor('RANDOM')
  .setTitle("The 8ball says:")
  .setDescription(`Q: **${args[0][0].toUpperCase()}${args[0].slice(1).toLowerCase()} ${args.slice(1).join(' ').toLowerCase()}**\nAns: **${answer}**`)
  .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true})
)
  ]
})
  }
}