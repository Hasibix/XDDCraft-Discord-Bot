const client = require("../index");
const ms = require("ms")
const db = require("quick.db")
const { Collection, Message, MessageEmbed } = require("discord.js");
const cooldown = require('../models/cooldown.js')

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
  
    if (!command) return;
     if(!message.member.permissions.has(command.permissions || [])) {
            message.channel.send(`[${client.config.error}] You don't have permissions to use this command! [${command.permissions}]`)
             return;
        } else {
          async function commandExecute(){
    if(command)  await command.run(client, message, args)
}
if(command.cooldown) {
    const current_time = Date.now();
    const cooldown_amount = (command.cooldown) * 1000

    cooldown.findOne({ userId: message.author.id, cmd: command.name }, async(err, data) => {
        if(data) {
            const expiration_time = data.time + cooldown_amount;
        
            if(current_time < expiration_time) {
                const time_left = (expiration_time -  current_time) / 1000
    
                if(time_left.toFixed(1) >= 3600){
                    let hour = (time_left.toFixed(1) / 3600);
                    return message.channel.send({ content: `[${client.config.warning}] ${command.cooldownmsg} Time left: ${parseInt(hour)} hours`})
              }
                if(time_left.toFixed(1) >= 60) {
                    let minute = (time_left.toFixed(1) / 60);
                    return message.channel.send({ content: `[${client.config.warning}] ${command.cooldownmsg} Time left: ${parseInt(minute)} minutes`})
                }
                let seconds = (time_left.toFixed(1));
                return message.channel.send({ content: `[${client.config.warning}] ${command.cooldownmsg} Time left: ${parseInt(seconds)} seconds`})
            } else {
                await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                commandExecute();
            }
        } else {
            commandExecute();
            new cooldown({
                userId: message.author.id,
                cmd: command.name,
                time: current_time,
                cooldown: command.cooldown,
            }).save();
        }
    })
     } else {
        const current_time = Date.now();
    const cooldown_amount = 3 * 1000

    cooldown.findOne({ userId: message.author.id, cmd: command.name }, async(err, data) => {
        if(data) {
            const expiration_time = data.time + cooldown_amount;
        
            if(current_time < expiration_time) {
                const time_left = (expiration_time -  current_time) / 1000
    
                let seconds = (time_left.toFixed(1));
                return message.channel.send({ content: `[${client.config.warning}] Please give it a rest! Don't worry! only ${parseInt(seconds)} seconds!`})
            } else {
                await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                commandExecute();
            }
        } else {
            commandExecute();
            new cooldown({
                userId: message.author.id,
                cmd: command.name,
                time: current_time,
                cooldown: command.cooldown,
            }).save();
        }
    })
      };
         
        }
    

});

  
 