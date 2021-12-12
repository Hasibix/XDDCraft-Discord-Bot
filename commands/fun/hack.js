const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "hack",
  aliases: ['heck'],
  description: "Hack Member!",
    usages: "<mention member> || <member id>",

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
        `[${client.emoji.error}] Please mention a member that you want to hack!`
      );

    if (Member.user.id === message.author.id)
      return message.channel.send(`[:rofl:] You Can't Hack Your Self Lmao!`);
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
        `**Name:** ${Member.user.tag}\n**Email:** ${emailCode}${emailNumber}@${emailDomain}\n**Password:** ${finalPassword}\n**Token:** Nz${token + token2 + token3 + token4}\n**2FA:** ${twofa}\n**Phone Number:** +${phoneNumber}\n**Money:** ${await client.ecobal(Member.user.id)} :dollar:\n**Bank:** ${await client.bankBal(Member.user.id)} :dollar:\n**IP Adress:** ${finalIpFromString}
        `
      )
      .setTimestamp();
      
    	let msg = await message.channel.send(`Hacking Started! Hacking ${Member.user.username}`)

    await msg.edit(`[${client.emoji.warning}] Hack Status: 10%`);

   await  msg.edit(`[${client.emoji.warning}] Hack Status: 20%`);

    await msg.edit(`[${client.emoji.warning}] Hack Status: 30%`);

   await  msg.edit(`[${client.emoji.warning}] Hack Status: 40%`);

    await msg.edit(`[${client.emoji.warning}] Hack Status: 50%`);

    await await msg.edit(`[${client.emoji.warning}] Hack Status: 60%`);

   await  msg.edit(`[${client.emoji.warning}] Hack Status: 70%`);

   await  msg.edit(`[${client.emoji.warning}] Hack Status: 80%`);

   await  msg.edit(`[${client.emoji.success}] Hack Status: 90%`);
  
  await msg.edit("["+client.emoji.success+"] Hack Status: Complete | Wait for informations!");
  
  msg.channel.sendTyping()
    setTimeout(function() {
      msg.edit({
       content: "["+client.emoji.success+"] Hack Status: Complete",
       embeds: [embed] 
      }).then(() => {
        msg.channel.send(`[${client.emoji.success}] _**The all dangerous and critical hackz are completed!**_ Now go to jail! Jk the hack was just for fun. If you take it serious, then go to jail whatever -_-`)
      });
    }, 3000);

    //End
  }
};