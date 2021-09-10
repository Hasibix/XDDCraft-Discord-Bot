const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const createCaptcha = require('../captcha');
const fsC = require('fs').promises;

client.on('guildMemberAdd', async member => {
      if(member.bot) return;
      const noverifiedrole = member.guild.roles.cache.find(role => role.name === 'Not-Verified');
      const verifiedrole = member.guild.roles.cache.find(role => role.name === 'Verified');
      const memberrole = member.guild.roles.cache.find(role => role.name === 'Members');

      await member.roles.add(noverifiedrole.id);

    const captcha = await createCaptcha();
    try {
        const msg = await member.send('You have 30 sec to solve the captcha', {
            files: [{
                attachment: `./captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('You entered the captcha incorrectly. Rejoin the server! ||https://discord.gg/pajtyHaHga||');
                    member.kick()
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']});
            if(response) {
                await msg.channel.send('You have verified yourself!');
                await member.roles.remove(noverifiedrole.id);
                await member.roles.add(verifiedrole.id);
                await member.roles.add(memberrole.id);
                await fsC.unlink(`./captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time.');
            await member.kick();
            await fsC.unlink(`./captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});
client.on('guildMemberAdd', async member => {
       if(member.bot) return;
       const channel = member.guild.channels.cache.get('792316994136965130')
       
       const welembed = new MessageEmbed()
       .setTitle(`**Welcome to ${member.guild.name} !!!**`)
       .setDescription(`Hello **${member.displayName}** welcome to **${member.guild.name}**! Enjoy your stay **${member.displayName}**!!!! Now we have: ${member.guild.memberCount} Members!`)
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

        channel.send(welembed);
        member.send(`Hey there! welcome to **${member.guild.name}**!! thank you soo much for joining our server! Now we have ${member.guild.memberCount} Members!!`);
    });

