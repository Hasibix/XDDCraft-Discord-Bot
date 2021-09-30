const { Client, Message, MessageEmbed } = require('discord.js')
const math = require("mathjs");
const colors = require("../../models/colors")
module.exports = {
    name : 'calculate',
    category : 'fun',
    aliases : ['math'],
    description : 'calculates your math :)',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
       const plus = math.evaluate(args[0]+"+"+args[2]);
      const minus = math.evaluate(args[0]+"-"+args[2]);
      const multiplier = math.evaluate(args[0]+"*"+args[2]);
      let color = colors.find((val) => (val.name.toLowerCase()) === args[0]);
       
      
       const Multi = new MessageEmbed()
      .setDescription("```\n"+args[0]+" x "+args[2]+" "+" = "+ multiplier+"\n```\n")
      .setColor(color.toUpperCase());
      const Plus = new MessageEmbed()
      .setDescription("```\n"+args[0]+" "+args[1]+" "+args[2]+" "+" = "+plus+"\n```\n")
      .setColor(color.toUpperCase());
       const Minus = new MessageEmbed()
      .setDescription("```\n"+args[0]+" "+args[1]+" "+args[2]+" "+" = "+ minus+"\n```\n")
      .setColor(color.toUpperCase());
      const MultiWithStar = new MessageEmbed()
      .setDescription("```\n"+args[0]+" "+args[1]+" "+args[2]+" "+" = "+multiplier+"\n```\n")
      .setColor(color.toUpperCase());
      
      if(!args[0]) return message.channel.send("["+client.config.error+"] Input a number to calculate");
      if(!args[1]) return message.channel.send("["+client.config.error+"] Please specify a type of calculation! (ex: +, x, *, - etc!)");
      if(!args[2]) return message.channel.send(`[${client.config.error}] Input a number to calculate it with **${args[0]}${args[1]}( put number here C: )`);
      
      
      if(isNaN(args[0]) || isNaN(args[2])) return message.channel.send(`[${client.config.error}] Uh... I really don't know how to calculate a word ;-;`)
      
     

      if(args[1] === "x") return message.channel.send({ embeds: [Multi] });
      if(args[1] === "+") return message.channel.send({ embeds: [Plus] });
      if(args[1] === "-") return message.channel.send({ embeds: [Minus] });
      if(args[1] === "*") return message.channel.send({ embeds: [Multi] });
      
    }
}