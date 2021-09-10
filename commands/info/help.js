const Discord = require("discord.js");
const{ MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination")

module.exports={
name: "help",
aliases: ["h"],
description: "Help Command!",
run: async (client, message, args) => {

const Color="GREEN";
const Prefix="XDD";
let embed1 = new MessageEmbed()
.setColor("#A7D28B")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**ECONOMY**\n```Addmoney,\nBal,\nBeg,\nBuy,\nDaily,\nInventory,\nRich,\nSearch,\nSetmoney,\nShop,\nTransfer,\nWeekly,\nWork```")
.setFooter(`Requested By ${message.author.username}`, message.member.user.displayAvatarURL({dynamic:true}))
.setTimestamp();
let embed2 = new MessageEmbed()
.setColor("#FFCC4D")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**FUN**\n```Avatar,\nCalculate,\nCoinflip,\nEmojify,\nHack,\nHangman,\nMeme,\nReverse,\nRps,\nTictactoe```")
.setFooter(`Requested By ${message.author.username}`, message.member.user.displayAvatarURL({dynamic:true}))
.setTimestamp();
let embed3 = new MessageEmbed()
.setColor("#DD2E44")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**GIVEAWAY**\n```End,\nReroll,\nStart```")
.setFooter(`Requested By ${message.author.username}`, message.member.user.displayAvatarURL({dynamic:true}))
.setTimestamp();
let embed4 = new MessageEmbed()
.setColor("#7289DA")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**INFO**\n```Help,\nLeaderboard,\nPing,\nVersion```")
.setFooter(`Requested By ${message.author.username}`, message.member.user.displayAvatarURL({dynamic:true}))
.setTimestamp();
let embed5 = new MessageEmbed()
.setColor("#226699")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**LEVELS**\n```Level,\nAddxp,\nRemovexp```")
.setFooter(`Requested By ${message.author.username}`, message.member.user.displayAvatarURL({dynamic:true}))
.setTimestamp();
let embed6 = new MessageEmbed()
.setColor("#5865F2")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**MOD**\n```Ban,\nUnban,\nKick,\nMute,\nUnmute,\nWarn,\nUnwarn```")
.setFooter(`Requested By ${message.author.username}`, message.member.user.displayAvatarURL({dynamic:true}))
.setTimestamp();
let  embed7 = new MessageEmbed()
.setColor("#5DADEC")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**MUSIC**\n```Bassboost,\nClear,\nConfig,\nDisconnect,\nGrab,\nLoop,\nLoopqueue,\nLyrics,\nNowplaying,\nPause,\nPlay,\nQueue,\nRemove,\nResume,\nSearch,\nSeek,\nShuffle,\nSkip,\nSkipto,\nStats-music,\nVolume,\nYoutube```")
.setFooter(`Requested By ${message.author.username}`, message.member.user.displayAvatarURL({dynamic:true}))
.setTimestamp();

    let pages = [
      embed1,
      embed2,
      embed3,
      embed4,
      embed5,
      embed6,
      embed7
    ]
    let timeout = 300000;
    const emoji = ["⬅️", "➡️"]
    pagination(message, pages, emoji, timeout)
    
   }
}
