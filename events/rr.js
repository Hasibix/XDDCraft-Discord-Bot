const client = require("../index")
const rrSchema = require("../models/reactionroles.js")
const captchaSchema = require("../models/captchaforserver.js")
const captcharoleSchema = require("../models/captcha.js")
const { MessageEmbed } = require("discord.js")

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  const member = reaction.message.guild.members.cache.get(user.id)
  if(user.bot) return;
  
  rrSchema.findOne({ Guild: reaction.message.guild.id, Channel: reaction.message.channel.id, Message: reaction.message.id, Emoji: reaction.emoji.name }, async(err, data) => {
   if(data) {
          if(reaction.emoji.name === data.Emoji) {
           
             try {
             member.roles.add(data.Role)
            
             console.log(`Reaction-Roles: Given a role to ${user.tag} in reaction roles. \n  Emoji: ${data.Emoji}\n  MessageId: ${reaction.message.id}`)
             if(data.DM === true) {
               member.send({
                 embeds: [
                   new MessageEmbed()
                   .setTitle(`You have got a role from reaction!`)
                   .setAuthor(reaction.message.guild.name, reaction.message.guild.iconURL)
                   .setDescription(`**Details:**\nEmoji: ${data.Emoji}\nRole: ${data.Role}`)
                   .setColor(client.rrColor)
                 ]
               })
             } else if (data.DM === false){
               console.log("Dm is not allowed in that reaction roles")
               return;
             } else {
               console.log("Dm is not allowed in that reaction roles")
               retu;
             }
           } catch (err) {
             console.log("An error occured in reaction-roles!")
             console.log(err)
           }
           
       
    } else {
      return;
    }
   } else {
     return
   }
  })
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  const member = reaction.message.guild.members.cache.get(user.id)
  if(user.bot) return;
  
  rrSchema.findOne({ Guild: reaction.message.guild.id, Channel: reaction.message.channel.id, Message: reaction.message.id, Emoji: reaction.emoji.name }, async(err, data) => {
   if(data) {
          if(reaction.emoji.name === data.Emoji) {
           
             try {
             member.roles.remove(data.Role)
             console.log(`Reaction-Roles: Removed a role from ${user.tag} in reaction roles. \n  Emoji: ${data.Emoji}\n  MessageId: ${reaction.message.id}`)
             if(data.DM === true) {
               member.send({
                 embeds: [
                   new MessageEmbed()
                   .setTitle(`You lost a role from reaction!`)
                   .setAuthor(reaction.message.guild.name, reaction.message.guild.iconURL)
                   .setDescription(`**Details:**\nEmoji: ${data.Emoji}\nRole: ${data.Role}`)
                   .setColor(client.rrColor)
                 ]
               })
             } else if (data.DM === false){
               console.log("Dm is not allowed in that reaction roles")
               return;
             } else {
               console.log("Dm is not allowed in that reaction roles")
               return;
             }
           } catch (err) {
             console.log("An error occured in reaction-roles!")
             console.log(err)
           }
           
       
    } else {
      return;
    }
   } else {
     return
   }
  })
});