const client = require("../index");
const { MessageEmbed } = require("discord.js")



client.on('guildMemberRemove', async(member) => { // this event gets triggered when a new member leaves the server!
    if(member.guild.id !== "792256780158631966") return;
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    const Channel = member.guild.channels.cache.get('792317114823475201') //insert channel id that you want to send to
    //making embed
    Channel.send("• A member left our server :(\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n•Now we have "+ member.guild.memberCount + ` Members\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n**• ${member.user.tag}** Why did you left our server? :cry:`)
})

  