const { Discord, Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const colors = require("../../models/colors")
const { Calculator } = require("weky");
const math = require("mathjs");
module.exports = {
    name : 'calculator',
    aliases : [],
    description : 'calculates your math :)',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
    
      let color = colors.find((val) => (val.name.toLowerCase()) === args[0]).value;
      
      if(!args[0]) { let color = "GREY" }
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