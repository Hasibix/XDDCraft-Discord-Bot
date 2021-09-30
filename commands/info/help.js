// Added By Hasibix#0001

const { pagination } = require('reconlx')
const { Message, Client, MessageEmbed, MessageButton} = require('discord.js')

module.exports = {
    name : 'help',
    description : 'bruh',
    category: "info",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */ 

    run : async(client, message, args) => {
        
const Color="GREEN";
const Prefix="XDD";
let embed1 = new MessageEmbed()
.setColor(client.economyColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**ECONOMY**\n```Addmoney,\nBal,\nBeg,\nBuy,\nDaily,\nInventory,\nRich,\nSearch,\nSetmoney,\nShop,\nTransfer,\nWeekly,\nWork```")
.setTimestamp();
let embed2 = new MessageEmbed()
.setColor(client.funColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**FUN**\n```Avatar,\nCoinflip,\nEmojify,\nHack,\nHangman,\nMeme,\nReverse,\nRps,\nTictactoe,\nDog,\nImage,\nSnake```")
.setTimestamp();
let embed3 = new MessageEmbed()
.setColor(client.giveawayColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**GIVEAWAY**\n```End,\nReroll,\nStart```")
.setTimestamp();
let embed4 = new MessageEmbed()
.setColor(client.infoColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**INFO**\n```Help,\nLeaderboard,\nPing,\nVersion,\nWhois```")
.setTimestamp();
let embed5 = new MessageEmbed()
.setColor(client.levelColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**LEVELS**\n```Level,\nAddxp,\nRemovexp,\nAddlevel,\nRemovelevel```")
.setTimestamp();
let embed6 = new MessageEmbed()
.setColor(client.modColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**MOD**\n```Ban,\nUnban,\nKick,\nMute,\nUnmute,\nWarn,\nUnwarn```")
.setTimestamp();
let  embed7 = new MessageEmbed()
.setColor(client.musicColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**MUSIC**\n```Bassboost,\nClear,\nConfig,\nDisconnect,\nGrab,\nLoop,\nLoopqueue,\nLyrics,\nNowplaying,\nPause,\nPlay,\nQueue,\nRemove,\nResume,\nSearch,\nSeek,\nShuffle,\nSkip,\nSkipto,\nStats-music,\nVolume,\nYoutube```")
.setTimestamp();
let  embed8 = new MessageEmbed()
.setColor(client.rrColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**REACTION-ROLES**\n```Add,\nRemove,\nEdit```")
.setTimestamp();
let  embed9 = new MessageEmbed()
.setColor(client.utilityColor)
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**UTILITY**\n```Addrole,\nCalculate,\nCalculator\nConfig,\nPrivateMessage,\nPurge,\nRemoveRole,\nSay,\nTicket```")
.setTimestamp();


    let pages = [
      embed1,
      embed2,
      embed3,
      embed4,
      embed5,
      embed6,
      embed7,
      embed8,
      embed9
    ]
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
      embeds: pages,
      time: timeout,
      fastSkip: true,
    });
    // const emoji = ["⬅️", "➡️"]
    
    }
}