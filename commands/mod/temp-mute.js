const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: "<mention member> <timeout> || <mention member> <timeout> <reason>",
    permissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        try {
          const duration = args[1];
          const second = duration * 1000;

            if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send(`[${client.emoji.error}] I don't have permissions to mute someone ;-; [MANAGE_ROLES]`)
            if (!args[0]) return message.channel.send(`[${client.emoji.error}] Please enter a user to be muted!`);
          
            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send(`[${client.emoji.error}] Please enter a valid user to be muted!`);
            if(!duration) return message.channel.send(`[${client.emoji.error}] Enter a amount of second to mute a user!`)
            if(isNaN(duration)) return message.channel.send(`[${client.emoji.error}] Enter a valid amount of second to mute a user!`)
            if (mutee === message.member) return message.channel.send(`[${client.emoji.error}] You can't mute yourself!`)
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send(`[${client.emoji.error}] I can't mute this user`)

            let reason = args.slice(2).join(" ");
            if (mutee.user.bot) return message.channel.send(`[${client.emoji.error}] I can't mute bots ;-;`);
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole_${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "Muted")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({  
                            name: "Muted",
                            color: "#808080",
                            permissions: [],
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.permissionOverwrites.create(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };

            if (mutee.roles.cache.has(muterole.id)) return message.channel.send(`[${client.emoji.warning}] This user is already muted!`)

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`**You have been muted in ${message.guild.name} for - ${reason || "No Reason"}`).catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                   if (reason) {
                message.channel.send(`[${client.emoji.success}] ${mutee.user.username} was successfully muted for ${duration} second! Reason: ${reason}`);
                } else {
                message.channel.send(`[${client.emoji.success}] ${mutee.user.username} was successfully muted for ${duration} second!`);
                }
                      let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

             setTimeout(function(){ 
                  try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**You have been unmuted in ${message.guild.name}**!`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
               }, second);
        } catch {
            return;
        }
    }
}