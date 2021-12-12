const { Discord, Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const colors = require("../../models/colors")
const { Calculator } = require("weky");
const math = require("mathjs");
module.exports = {
    name : 'calculator',
    aliases : [],
    description : 'opens a calculator :)',
   
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
      usages: "<color>",

    run : async(client, message, args) => {
      let color;
      if(args[0]) {
        color = colors.find((val) => (val.name.toLowerCase()) === args[0]).value;
      } else {
        color = colors.find((val) => (val.name.toLowerCase()) === "grey").value;
      }
      

     await Calculator({
    message: message,
    embed: {
        title: 'Calculator for '+message.author.tag+'!',
        color: color.toUpperCase(),
        footer: 'Use the buttons to use the calculator!',
        timestamp: true
      },
         disabledQuery: 'Calculator is disabled!',
         invalidQuery: 'The provided equation is invalid!',
         othersMessage: 'Only <@{{author}}> can use the buttons!'
      });
    },
}