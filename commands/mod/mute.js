const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
        name: "mute",
        description: "Mutes a member in the discord!",
    permissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        try {
          const duration = args[1];
          const second = duration * 1000;

            if (!message.guild.me.permissions.has("MANAGE_GUILD")) return message.channel.send(`[${client.config.error}] I don't have permissions to mute someone ;-; [MANAGE_GUILD]`)
            if (!args[0]) return message.channel.send(`[${client.config.error}] Please enter a user to be muted!`);
          
            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send(`[${client.config.error}] Please enter a valid user to be muted!`);
            if(!duration) return message.channel.send(`[${client.config.error}] Enter a amount of second to mute a user!`)
            if(isNaN(duration)) return message.channel.send(`[${client.config.error}] Enter a valid amount of second to mute a user!`)
            if (mutee === message.member) return message.channel.send(`[${client.config.error}] You can't mute yourself!`)
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send(`[${client.config.error}] I can't mute this user`)

            let reason = args.slice(2).join(" ");
            if (mutee.user.bot) return message.channel.send(`[${client.config.error}] I can't mute bots ;-;`);
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
                        data: {
                            name: "Muted",
                            color: "#808080",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
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

            if (mutee.roles.cache.has(muterole.id)) return message.channel.send(`[${client.config.warning}] This user is already muted!`)

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`**You Have Been Muted In ${message.guild.name} for - ${reason || "No Reason"}`).catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                   if (reason) {
                message.channel.send(`[${client.config.success}] ${mutee.user.username} was successfully muted for ${duration} second! Reason: ${reason}`);
                } else {
                message.channel.send(`[${client.config.success}] ${mutee.user.username} was successfully muted for ${duration} second!`);
                }
                      let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

             setTimeout(function(){ 
                  try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**You Have Been Unmuted In ${message.guild.name}**!`).catch(() => null)
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
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embedModLog = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL())
                .addField("**Moderation**", "mute")
                .addField("**Muted**", mutee.user.username)
                .addField("**Moderator**", message.author.username)
                .addField("**Duration**", `${duration + " Seconds" || "**No duration, until he unmutes!**"}`)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({ embeds: [embedModLog]})
        } catch {
            return;
        }
    }
}