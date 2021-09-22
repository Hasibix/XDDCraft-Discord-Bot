const { Client, Message, MessageEmbed } = require('discord.js')
const math = require("mathjs");
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
      const red = "FF0000";
      const pink = "FFC0CB";
      const purple = "800080";
      const megenta = "FF00E0";
      const green = "008000";
      const lime = "00FF00";
      const black = "000000";
      const grey = "808080";
      const yellow = "FFFF00";
      const orange = "FFA500";
      const brown = "A52A2A";
      const blue = "0000FF";
      const aqua = "00FFFF";
      var color;

      if(args[3] === "red")  { color = red }
      if(args[3] === "pink") { color = pink }
      if(args[3] === "purple") { color = purple }
      if(args[3] === "megenta") { color = megenta }
      if(args[3] === "green") { color = green }
      if(args[3] === "lime") { color = lime }
      if(args[3] === "black") { color = black }
      if(args[3] === "grey") { color = grey }
      if(args[3] === "yellow") { color = yellow }
      if(args[3] === "orange") { color = orange }
      if(args[3] === "brown") { color = brown }
      if(args[3] === "blue") { color = blue }
      if(args[3] === "aqua") { color = aqua }
      
       const Multi = new MessageEmbed()
      .setDescription("```\n"+args[0]+" "+args[1]+" "+args[2]+" "+" = "+ multiplier+"\n```\n")
      .setColor(color);
      const Plus = new MessageEmbed()
      .setDescription("```\n"+args[0]+" "+args[1]+" "+args[2]+" "+" = "+plus+"\n```\n")
      .setColor(color);
       const Minus = new MessageEmbed()
      .setDescription("```\n"+args[0]+" "+args[1]+" "+args[2]+" "+" = "+ minus+"\n```\n")
      .setColor(color);
      const MultiWithStar = new MessageEmbed()
      .setDescription("```\n"+args[0]+" "+args[1]+" "+args[2]+" "+" = "+multiplier+"\n```\n")
      .setColor(color);
      
      if(!args[0]) return message.channel.send(`[${client.config.error}] Input a number to calculate.`);
      if(!args[1]) return message.channel.send(`[${client.config.error}] Input a type of calculation! (ex: +, -, x etc.)`);
      if(!args[2]) return message.channel.send(`[${client.config.error}] Input another number to calculate with **${args[1]}**`);
      
      
      if(isNaN(args[0]) || isNaN(args[2])) return message.channel.send(`[${client.config.error}] Please type real number to calculate!`)
      
     

      if(args[1] === "x") return message.channel.send(Multi);
      if(args[1] === "+") return message.channel.send(Plus);
      if(args[1] === "-") return message.channel.send(Minus);
      if(args[1] === "*") return message.channel.send(Multi);
      
    }
}