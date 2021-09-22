const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "hack",
  aliases: ['heck'],
  description: "Hack Member!",
  run: async (client, message, args, length) => {
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0])
    
    let password = (Math.random() + 1).toString(36).slice(2,5);
    let token = (Math.random() + 1).toString(36).slice(2,122);
    let token2 = (Math.random() + 1).toString(36).slice(2,122);
    let token3 = (Math.random() + 1).toString(36).slice(2,122);
    let token4 = (Math.random() + 1).toString(25).slice(2,122);
    
 
    if (!Member)
      return message.channel.send(
        `Please Mention A Member That You Want To Hack!`
      );

    if (Member.user.id === message.author.id)
      return message.channel.send(`You Can't Hack Your Self Lmao!`);
    let emailDomains = [
      "gmail.com", 
      "yahoo.com",
      "yandex.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
      "temp-mail.org",
      "hackernet.com",
      "poormail.com"
    ];
     let twofaTypes = [
         "Yes",
         "No"
    ];
    let twofa = twofaTypes[Math.floor(Math.random() * twofaTypes.length)]
    let emailCode = Member.user.username.toLowerCase();
    let money = Math.floor(000000 + Math.random() * 90000);
    let ip1 = Math.floor(00 + Math.random() * 900);
    let ip2 = Math.floor(000 + Math.random() * 900);
    let ip3 = Math.floor(00 + Math.random() * 900);
    let ip4 = Math.floor(0 + Math.random() * 90);
    let ip5 = Math.floor(0 + Math.random() * 90);
    
    let emailNumber = Math.floor(0000 + Math.random() * 90000);
    let emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)]
    let phoneNumber = Math.floor(00000000000 + Math.random() * 90000000000);

    let finalPasswordsPototype = [
         Member.user.username + password,
         password
    ]
    let ips = [
      ip1 + "." + ip2 + "." + ip3 + "." + ip4,
      ip1 + "." + ip2 + "." + ip3,
      ip1 + "." + ip2 + "." + ip3 + "." + ip4 + "." + ip5
    ]
    let moneyTypes = [
      "$",
      "৳",
      "£",
      "€",
      "฿"
    ]
    let moneyType = moneyTypes[Math.floor(Math.random() * moneyTypes.length)]
    let finalIpFromString = ips[Math.floor(Math.random() * ips.length)]
    let finalPassword = finalPasswordsPototype[Math.floor(Math.random() * finalPasswordsPototype.length)]
    
    let embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`Informations`)
      .setDescription(
        `**Name:** ${Member.user.tag}\n**Email:** ${emailCode}${emailNumber}@${emailDomain}\n**Password:** ${finalPassword}\n**Token:** Nz${token + token2 + token3 + token4}\n**2FA:** ${twofa}\n**Phone Number:** +${phoneNumber}\n**Money:** ${money}${moneyType}\n**IP Adress:** ${finalIpFromString}
        `
      )
      .setTimestamp();
      
    	let msg = await message.channel.send(`Hacking Started! Hacking ${Member.user.username}`)

    await msg.edit(`Hack Status: 10%`);

   await  msg.edit(`Hack Status: 20%`);

    await msg.edit(`Hack Status: 30%`);

   await  msg.edit(`Hack Status: 40%`);

    await msg.edit(`Hack Status: 50%`);

    await await msg.edit(`Hack Status: 60%`);

   await  msg.edit(`Hack Status: 70%`);

   await  msg.edit(`Hack Status: 80%`);

   await  msg.edit(`Hack Status: 90%`);
  
  await msg.edit("Hack Status: Complete | Wait for informations!");

    setTimeout(function() {
      msg.edit("Hack Status: Complete");
      msg.edit({ embeds: [embed] });
    }, 3000);

    //End
  }
};