const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const Schema = require("../models/captcha")
const Discord = require("discord.js")

client.on('guildMemberAdd', async (member) => {
try {
  Schema.findOne({ Guild: member.guild.id }, async(err, data) => {
    if(!data) return;
    const nonverifiedrole = data.Non_VerifyRole
    member.roles.add(nonverifiedrole)
     const memberrole = data.Roles2
    
 
 
  const toggle = db.get(`mentionmemberforcaptcha_${member.guild.id}`)
      if(toggle === null) { toggle === false }
	    let captchaLogsID = db.get(`modlog_${member.guild.id}`);
	    let captchaLogs = member.guild.channels.cache.get(captchaLogsID);
	    let invalid = 0;
	const captcha = client.captcha();
	console.log(captcha.text);
	const { buffer } = captcha;


     let msg = await member.send({
    content: `[${client.config.warning}] You have 60 sec to solve this captcha! ${member.user.toString()}`,
		files: [buffer]
	})
	let pog = data.Roles

	let filter = m => m.author.id === member.user.id;

	let collector = new Discord.MessageCollector(msg.channel, filter, {
		max: 11,
		time: 60000
	});
	let fuckterval = setInterval(() => {
		if (!member.guild.members.cache.get(member.user.id)) collector.stop();
	}, 3000);

	collector.on('collect', async message => {
		if (!message.content) return;
		let num = 1;
		let time = num++;
		if (message.content != captcha.text && !message.author.bot) {
			invalid++;
			if (invalid > 9 && toggle === true) {
				if (member.kickable) {
					message.channel.send(
						'['+client.config.error+'] Too many invalid captcha attempts, kicking you.'
					);
					member.kick();

					return;
				}
				collector.stop();
				return;
			} else if (toggle === false && invalid > 9) {

				message.channel.send('['+client.config.error+'] Too many invalid Attempts.');

				collector.stop()
				return;
			}
			message.channel.send(
				`[${client.config.error}] Invalid code. Try again. Attempts left: ${10 - invalid}`
			);
		}
		if (message.content === captcha.text) {
			try {
				message.channel.send('['+client.config.success+'] You have verified yourself!');
				member.roles.add(pog);
        member.roles.add(memberrole);
        member.roles.remove(nonverifiedrole)
				collector.stop();
			} catch (err) {
				collector.stop();
				message.channel.send('['+client.config.error+'] An error occured!');
        console.log(err);
			}
		}
	});
	collector.on('end', async (collected, reason) => {
		clearInterval(fuckterval);
		if (reason === 'time' && toggle === true) {
			if (member.kickable) {
				member.send(
					`[${client.config.error}] You did not responded on time! Rejoin the server`
				);
				member.kick();
				}
				return;
			} else if (toggle === false && reason === 'time') {

			message.channel.send('['+client.config.error+'] You did not responded on time! Rejoin the server');
	    member.kick();
		}
	});
   })
   } catch (error) {
  console.log(`${member.user.tag} Joined ${member.guild.name} server! But sadly i could not send that user captcha ;-;`)
  return;
}

  
});

client.on('guildMemberAdd', async member => {
       if(member.bot) return;
       if(member.guild.id !== "792256780158631966") return;
       const channel = member.guild.channels.cache.get('792316994136965130')
       
       const welembed = new MessageEmbed()
       .setTitle(`**Welcome to ${member.guild.name} !!!**`)
       .setDescription(`Hello **${member.displayName}** welcome to **${member.guild.name}**! Enjoy your stay **${member.displayName}**!!!! The user was invited by idk! Now we have: ${member.guild.memberCount} Members!`)
       .setColor("GREEN")
       .setAuthor("Welcome", client.user.displayAvatarURL({
          dynamic: true
        }))
        .setThumbnail(client.user.displayAvatarURL({
          dynamic: true
        }))
        .setFooter(`A welcome message by @${client.user.tag}`, client.user.displayAvatarURL({
          dynamic: true
        }));

        channel.send({
          embeds: [welembed]
          });
        member.send(`Hey there! welcome to **${member.guild.name}**!! thank you soo much for joining our server! Now we have ${member.guild.memberCount} Members!!`);
    });

