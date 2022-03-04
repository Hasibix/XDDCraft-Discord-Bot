const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const Schema = require("../models/captcha")
const Discord = require("discord.js")

const { promisify } = require('util');

const wait = promisify(setTimeout)

let invites;

client.on('ready', async() => {
    await wait(2000);

    client.guilds.cache.get(client.config.guildId).invites.fetch().then(inv => {
        invites = inv;
    })
})
    

client.on('guildMemberAdd', async (member) => {
  if(member.guild.id !== "792256780158631966") return;
  member.roles.add(client.config.captcha.roles.noveri)
  const embed = new MessageEmbed().setColor("BLUE");
  embed.setTitle("Step 1/2: reCAPTCHA Verification")
  embed.setDescription(
    `Please solve reCAPTCHA here: ${
    client.config.captcha.settings.callback_url
    }\n after this you will get message about step 2/2.`
  );
  try {
    member.send({
    content: `<@${member.id}> Verification Season Started.`,
    embeds: [embed]
  });
  } catch(err) {
    return client.logger.log("Discord: New member doesnt have dms enabled! Need to tell him to enable dms ;-;")
  }
  
});



client.on('guildMemberAdd', async member => {
       if(member.bot) return;
       if(member.guild.id !== "792256780158631966") return;
       const channel = member.guild.channels.cache.get('792316994136965130')
           
  
      const welembed = new MessageEmbed()
        .setTitle("We got a new member!!")
      
         .setDescription(`A new member joined our server! Details:\n**Member**: ${member.user.tag}\n**Guild**: ${member.guild.name}\n**Current Member Count**: ${member.guild.memberCount}\n\nEnjoy your stay **${member.displayName}**! Thank you so much for joining us!`)
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

