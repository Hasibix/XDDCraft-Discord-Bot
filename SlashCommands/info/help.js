// Added By Hasibix#0001 & void#9822

const { pagination } = require('reconlx')
const { CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const paginationEmbed = require('discordjs-button-pagination');

module.exports = {
    name : 'help',
    description : 'bruh',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run : async(client, interaction, args) => {
        
const Color="GREEN";
const Prefix="XDD";
let embed1 = new MessageEmbed()
.setColor("#A7D28B")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**ECONOMY**\n```Addmoney,\nBal,\nBeg,\nBuy,\nDaily,\nInventory,\nRich,\nSearch,\nSetmoney,\nShop,\nTransfer,\nWeekly,\nWork```")
.setTimestamp();
let embed2 = new MessageEmbed()
.setColor("#FFCC4D")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**FUN**\n```Avatar,\nCalculate,\nCoinflip,\nEmojify,\nHack,\nHangman,\nMeme,\nReverse,\nRps,\nTictactoe```")
.setTimestamp();
let embed3 = new MessageEmbed()
.setColor("#DD2E44")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**GIVEAWAY**\n```End,\nReroll,\nStart```")
.setTimestamp();
let embed4 = new MessageEmbed()
.setColor("#7289DA")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**INFO**\n```Help,\nLeaderboard,\nPing,\nVersion```")
.setTimestamp();
let embed5 = new MessageEmbed()
.setColor("#226699")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**LEVELS**\n```Level,\nAddxp,\nRemovexp```")
.setTimestamp();
let embed6 = new MessageEmbed()
.setColor("#5865F2")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**MOD**\n```Ban,\nUnban,\nKick,\nMute,\nUnmute,\nWarn,\nUnwarn```")
.setTimestamp();
let  embed7 = new MessageEmbed()
.setColor("#5DADEC")
.setTitle(`${client.user.username} Commands!`)
.setDescription(`**Use arrows to change pages!**`+
"\n\n**MUSIC**\n```Bassboost,\nClear,\nConfig,\nDisconnect,\nGrab,\nLoop,\nLoopqueue,\nLyrics,\nNowplaying,\nPause,\nPlay,\nQueue,\nRemove,\nResume,\nSearch,\nSeek,\nShuffle,\nSkip,\nSkipto,\nStats-music,\nVolume,\nYoutube```")
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
    var page;
    const nextButton = new MessageButton()
      .setCustomId("nextbtn") 
      .setLabel("Next")
      .setStyle("PRIMARY");

const previousButton = new MessageButton()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("PRIMARY"); //wait



if(page === 1) {
  previousButton.setDisabled(true);
} else if (page === pages.length) {
  nextButton.setDisabled(true);
}
let buttonList = [nextButton, previousButton ];
    let timeout = 300000;
    const row = new MessageActionRow()
			.addComponents(
        previousButton,
        nextButton,
			);

paginationEmbed(interaction, pages, buttonList, timeout);
    // const emoji = ["⬅️", "➡️"]
  
    }
}