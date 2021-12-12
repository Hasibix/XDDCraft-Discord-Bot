const { Client, Collection, MessageEmbed, MessageActionRow, Permissions, MessageButton, MessageAttachment, Discord, WebhookClient, Intents } = require("discord.js");
require("dotenv").config();
const path = require('path');
const client = new Client({
    intents: [32767, Intents.FLAGS.GUILD_INVITES],
    allowedMentions: { parse: ["users", "roles"], repliedUser: true },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'BUTTON']
});

//console colors
const colors = require("colors");
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
// Global Variables
const Logger = require("./utils/Logger.js")
client.logger = new Logger(path.join(__dirname, "..", "Logs.log"))
client.commands = new Collection();
client.musicCommands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.emoji = require("./utils/emoji.json")
client.ProgressBar = require("./utils/ProgressBar")
module.exports = client;
// Initializing the project
require("./handler")(client);

try {
  client.login(process.env.BOT_TOKEN);
} catch (err) {
  console.log("An error was found while logining in!")
  console.log(err)
}
//embed colors!
client.levelColor = "#226699";
client.economyColor = "#A7D28B";
client.funColor = "#FFCC4D";
client.infoColor = "#7289DA";
client.giveawayColor = "#DD2E44";
client.modColor = "#5865F2";
client.musicColor = "#5DADEC";
client.utilityColor = "#FFCB63";
client.rrColor = "#FF63B1";

//Giveaway
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./storage/giveaway.json",
    default: {
        botsCanWin: false,
        embedColor: "#DD2E44",
        updateCountdownEvery: 3000,
        reaction: "🎉",
        lastChance: {
            enabled: true,
            content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
            threshold: 5000,
            embedColor: '#FFFF00'
        }
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageId} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageId} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageId} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

//Economy
const ecoSchema = require('./models/economy.js');
client.ecobal = (User) => new Promise(async ful => {
  const data = await ecoSchema.findOne({ User });
  if(!data) return ful(0);
  if(!data.Wallet || data.Wallet === null) return ful(0)
  ful(data.Wallet)
})
client.addmoney = (User, Money) => {
  ecoSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.Wallet += Money;
    } else {
      data = new ecoSchema({ User: User, Wallet: Money })
    }
    data.save();
  })
}
client.rmvmoney = (User, Money) => {
  ecoSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.Wallet -= Money;
    } else {
      data = new ecoSchema({ User: User, Wallet: -Money })
    }
    data.save();
  })
}
client.bankBal = (User) => new Promise(async ful => {
  const data = await ecoSchema.findOne({ User });
  if(!data) return ful(0);
  if(!data.Bank) return ful(0);
  ful(data.Bank)
})
client.bankDeposit = (User, Money) => {
  ecoSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.Bank += Money;
    } else {
      data = new ecoSchema({ User: User, Bank: Money })
    }
    data.save();
  })
}

client.bankWithdraw = (User, Money) => {
  ecoSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.Bank -= Money;
    } else {
      data = new ecoSchema({ User: User, Bank: -Money })
    }
    data.save();
  })
}

//captcha
const Canvas = require('canvas');
Canvas.registerFont('fonts/Roboto.ttf', { family: 'Roboto' });
Canvas.registerFont('fonts/sans.ttf', { family: 'Sans' });

client.captcha = async(member) => {
  const canvas = Canvas.createCanvas(400, 180);
	const ctx = canvas.getContext('2d');
	const num = 5;
	const cords = [];
	const colors = ['blue', 'red', 'green', 'yellow', 'black', 'white'];
	let string = '';
	const particles = Math.floor(Math.random() * 101);
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const charactersLength = characters.length;
	// Random code generation
	for (var i = 0; i < 5; i++) {
		string += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	ctx.font = 'bold 100px Roboto';
	ctx.lineWidth = 7.5;
	let textPos = 45;
	// Captcha text
	for (var i = 0; i < string.length; i++) {
		const char = string.charAt(i);
		const color = colors[Math.floor(Math.random() * colors.length)];
		ctx.fillStyle = color;
		ctx.fillText(char, textPos, 120);
		textPos += 65;
	}
	// Paticles
	for (var i = 0; i < particles; i++) {
		const pos = {
			width: Math.floor(Math.random() * canvas.width),
			height: Math.floor(Math.random() * canvas.height)
		};
		const color = colors[Math.floor(Math.random() * colors.length)];
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(pos.width, pos.height, 3.5, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	// Get the cords
	let x = 0;
	for (var i = 0; i < num + 1; i++) {
		const l = Math.floor(Math.random() * canvas.height);
		if (i != 0) x += canvas.width / num;
		cords.push([x, l]);
	}
	// Strokes
	for (var i = 0; i < cords.length; i++) {
		const cord = cords[i];
		const nextCord = cords[i + 1];
		const color = colors[Math.floor(Math.random() * colors.length)];
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(cord[0], cord[1]);
		if (nextCord) ctx.lineTo(nextCord[0], nextCord[1]);
		ctx.stroke();
	}
  const attachment = new MessageAttachment(canvas.toBuffer(), "captcha.png")
  client.logger.log(`Captcha: Step 2/2: User: ${member.tag}, Created new captcha for ${member.tag} code: ${string}`)
	const messagec = await member.send({
    embeds: [
      new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Step 2/2: Captcha image test")
      .setDescription(`You have completed step 1/2. This is last step. After this, you can access our server. Type the text shown in image! You have 60sec to complete this!!!`)
      .setImage("attachment://captcha.png")
    ],
    files: [attachment]
  })
    let invalid = 0;
    let uhveri = client.config.captcha.roles.veri2;
    let veri = client.config.captcha.roles.veri;
    let mem = client.config.captcha.roles.member;
	let filter = m => m.author.id === member.user.id;
  let collector = messagec.channel.createMessageCollector(filter, {
		max: 11,
		time: 60000
	});
  let fuckterval = setInterval(() => {
		if (!member.guild.members.cache.get(member.user.id)) collector.stop();
	}, 3000);


  collector.on('collect', async message => {
		if (!message.content) return;
    if(message.author.id !== member.id) return;
		let num = 1;
		let time = num++;
		if (message.content != string) {
			invalid++;
			if (invalid > 9) {
				if (member.kickable) {
					message.channel.send(
						`[${client.emoji.error}] You faild a lot times. So we kicked you.... Rejoin the server to start verification season again ;-;`
					);
					member.kick();
				collector.stop();
				return;
			}
      } 
			message.channel.send(
				`[${client.emoji.error}] Invalid code. Try again. Attempts left: ${10 - invalid}`
			);
		}
		if (message.content === string) {
		    member.roles.remove(uhveri)
        member.roles.add(veri)
        member.roles.add(mem)
        message.channel.send({
          embeds: [
            new MessageEmbed()
            .setTitle("Congrats!")
            .setDescription("You have successfully verified that you are not a robot! Thank you so much for spending your time also sorry ;-;")
            .setColor("GREEN")
          ]
        })
				collector.stop();
		}
	});
  collector.on('end', async (collected, reason) => {
		clearInterval(fuckterval);
			if (member.kickable) {
				if(reason === "time") {
          channel.send(
					`[${client.emoji.erorr}] You did not answered on time! So we kicked you.... Rejoin the server to start verification season again ;-;`
				);
				member.kick();
				return;
        }
			}
			return;
		
	});
}
//Level
const Levels = require("./models/levels.js");


client.lvlcreateUser = async(User, Guild, message) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");

    const isUser = await Levels.findOne({ User: User, Guild: Guild });
    if (isUser) return false;

    const newUser = new Levels({
      User: User,
      Guild: Guild
    });
    
    message.channel.send(`[${client.config.success}] Welcome our to leveling system! You have created your account.`)
    await newUser.save().catch(e => console.log(`Failed to create user: ${e}`));

    return newUser;
  }

  client.lvldeleteUser = async(User, Guild, message) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");

    const user = await Levels.findOne({ User: User, Guild: Guild });
    if (!user) return false;

    await Levels.findOneAndDelete({ User: User, Guild: Guild }).catch(e => console.log(`Failed to delete user: ${e}`));

    return user;
  }


client.appendXP = async(User, Guild, XP) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");
    if (XP == 0 || !XP || isNaN(parseInt(XP))) throw new TypeError("An amount of XP was not provided/was invalid.");

    const user = await Levels.findOne({ User: User, Guild: Guild });

    if (!user) {
      const newUser = new Levels({
        User: User,
        Guild: Guild,
        XP: XP,
        Level: Math.floor(0.1 * Math.sqrt(XP))
      });
      await newUser.save().catch(e => console.log(`Failed to save new user.`));

      return (Math.floor(0.1 * Math.sqrt(XP)) > 0);
    };

    user.XP += parseInt(XP, 10);
    user.Level = Math.floor(0.1 * Math.sqrt(user.XP));
    user.LastUpdated = new Date();
 
    await user.save().catch(e => console.log(`Failed to append XP: ${e}`) );

    return (Math.floor(0.1 * Math.sqrt(user.XP -= XP)) < user.Level);
  }

  client.appendLevel = async (User, Guild, Levelss) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");
    if (!Levelss) throw new TypeError("An amount of Levels was not provided.");

    const user = await Levels.findOne({ User: User, Guild: Guild });
    if (!user) return false;
    
    user.Level += parseInt(Levelss, 10);
    user.XP = user.Level * user.Level * 100;
    user.LastUpdated = new Date();
   
    user.save().catch(e => console.log(`Failed to append Level: ${e}`) );

    return user;
  }

  client.setXP = async (User, Guild, XP) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");
    if (!XP || isNaN(parseInt(XP))) throw new TypeError("An amount of XP was not provided/was invalid.");

    const user = await Levels.findOne({ User: User, Guild: Guild });
    if (!user) return false;

    user.XP = XP;
    user.Level = Math.floor(0.1 * Math.sqrt(user.XP));
    user.LastUpdated = new Date();
  
    user.save().catch(e => console.log(`Failed to set XP: ${e}`) );

    return user;
  }

   client.setLevel = async(User, Guild, Level) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");
    if (!Level) throw new TypeError("A Level was not provided.");

    const user = await Levels.findOne({ User: User, Guild: Guild });
    if (!user) return false;

    user.Level = Level;
    user.XP = Level * Level * 100;
    user.LastUpdated = new Date();
    
    user.save().catch(e => console.log(`Failed to set Level: ${e}`) );

    return user;
  }


  client.lvlfetch = async(User, Guild, fetchPosition = false) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");

    const user = await Levels.findOne({
      User: User,
      Guild: Guild
    });
    if (!user) return false;

    if (fetchPosition === true) {
      const leaderboard = await Levels.find({
        Guild: Guild
      }).sort([['XP', 'descending']]).exec();

      user.position = leaderboard.findIndex(i => i.User === User) + 1;
    }

    
    user.cleanXP = user.XP - client.xpFor(user.Level);
    user.cleanNextLevelXP = client.xpFor(user.Level + 1) - client.xpFor(user.Level);
    
    return user;
  }


  client.subtractXP = async (User, Guild, XP) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");
    if (XP == 0 || !XP || isNaN(parseInt(XP))) throw new TypeError("An amount of XP was not provided/was invalid.");

    const user = await Levels.findOne({ User: User, Guild: Guild });
    if (!user) return false;

    user.XP -= XP;
    user.Level = Math.floor(0.1 * Math.sqrt(user.XP));
    user.LastUpdated = new Date();
   
    user.save().catch(e => console.log(`Failed to subtract XP: ${e}`) );

    return user;
  }

  client.subtractLevel = async(User, Guild, Levelss) => {
    if (!User) throw new TypeError("An user id was not provided.");
    if (!Guild) throw new TypeError("A guild id was not provided.");
    if (!Levelss) throw new TypeError("An amount of Levels was not provided.");

    const user = await Levels.findOne({ User: User, Guild: Guild });
    if (!user) return false;

    user.Level -= Levelss;
    user.XP = user.Level * user.Level * 100;
    user.LastUpdated = new Date();
    
    user.save().catch(e => console.log(`Failed to subtract Levels: ${e}`) );

    return user;
  }


  client.lvlfetchLeaderboard = async(Guild, limit) => {
    if (!Guild) throw new TypeError("A guild id was not provided.");
    if (!limit) throw new TypeError("A limit was not provided.");

    var users = await Levels.find({ Guild: Guild }).sort([['XP', 'descending']]).exec();

    return users.slice(0, limit);
  }


  client.lvlcomputeLeaderboard = async(client, leaderboard, fetchUsers = false) => {
    if (!client) throw new TypeError("A client was not provided.");
    if (!leaderboard) throw new TypeError("A leaderboard id was not provided.");

    if (leaderboard.length < 1) return [];

    const computedArray = [];

    if (fetchUsers) {
      for (const key of leaderboard) {
        const user = await client.users.fetch(key.User) || { username: "Unknown", discriminator: "0000" };
        computedArray.push({
          Guild: key.Guild,
          User: key.User,
          XP: key.XP,
          Level: key.Level,
          position: (leaderboard.findIndex(i => i.Guild === key.Guild && i.User === key.User) + 1),
          username: user.username,
          discriminator: user.discriminator
        });
      }
    } else {
      leaderboard.map(key => computedArray.push({
        Guild: key.Guild,
        User: key.User,
        XP: key.XP,
        Level: key.Level,
        position: (leaderboard.findIndex(i => i.Guild === key.Guild && i.User === key.User) + 1),
        username: client.users.cache.get(key.User) ? client.users.cache.get(key.User).username : "Unknown",
        discriminator: client.users.cache.get(key.User) ? client.users.cache.get(key.User).discriminator : "0000"
      }));
    }

    return computedArray;
  }
  
 
  client.xpFor = async(targetLevel) => {
    if (isNaN(targetLevel) || isNaN(parseInt(targetLevel, 10))) throw new TypeError("Target Level should be a valid number.");
    if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10);
    if (targetLevel < 0) throw new RangeError("Target Level should be a positive number.");
    return targetLevel * targetLevel * 100;
  };
client.lvldeleteGuild = async(Guild) => { 
    if (!Guild) throw new TypeError("A guild id was not provided.");

    const guild = await Levels.findOne({ Guild: Guild });
    if (!guild) return false;

    await Levels.deleteMany({ Guild: Guild }).catch(e => console.log(`Failed to delete guild: ${e}`));

    return guild;
  }
//reaction roles
const rrSchema = require("./models/reactionroles.js")

client.createRR = (Guild, Channel, Message, Emoji, Role, DM, message) => {
  rrSchema.findOne({ Guild: Guild, Channel: Channel, Message: Message, Emoji: Emoji }, async(err, data) => {
    if(data) {
      return message.channel.send(`[${client.emoji.error}] There is already an reaction role with that emoji (${Emoji}) in message id (${Message})!`)
    } else {
      new rrSchema({
        Guild: Guild,
        Channel: Channel,
        Message: Message,
        Role: Role,
        Emoji: Emoji,
        DM: DM
      }).save()
      message.channel.send(`[${client.emoji.success}] Successfully created the reaction role!`)
    }
  })
}

client.editRRRole = (Guild, Channel, Message, Emoji, Role, message) => {
  rrSchema.findOne({ Guild: Guild, Channel: Channel, Message: Message, Emoji: Emoji }, async(err, data) => {
    if(data) {
     data.Role = Role;
        message.channel.send(`[${client.emoji.success}] Successfully edited reaction role! [Role = ${Role}]!`)
      data.save()
    } else {
     return message.channel.send(`[${client.emoji.error}] Theres no reaction role with that emoji on message id (${Message})!`);
    }
  });
}
client.editRRdm = (Guild, Channel, Message, Emoji, DM, message) => {
  rrSchema.findOne({ Guild: Guild, Channel: Channel, Message: Message, Emoji: Emoji }, async(err, data) => {
    if(data) {
     data.DM = DM;
        message.channel.send(`[${client.emoji.success}] Successfully edited reaction role! [DM = ${DM.toString()}]!`)
      data.save()
    } else {
     return message.channel.send(`[${client.emoji.error}] Theres no reaction role with that emoji on message id (${Message})!`);
    }
  });
}

client.deleteRR = (Guild, Channel, Message, Emoji, message) => {
  rrSchema.findOne({ Guild: Guild, Channel: Channel, Message: Message, Emoji: Emoji }, async(err, data) => {
    if(data) {
      message.channel.send(`[${client.emoji.success}] Successfully deleted the reaction role!`)
      data.delete()
    } else {
      return message.channel.send(`[${client.emoji.error}] Theres no reaction role with that emoji on message id (${Message})!`)
    }
 })
}

client.fetchAllReactionRoles = (Guild, client, message) => {
  const { pagination } = require('reconlx')
  rrSchema.findOne({ Guild: Guild }, async(err, data) => {
        if(!data) return message.channel.send(`[${client.emoji.error}] There are no reaction roles in the server!`)
      
        
      let all = await rrSchema.find({ Guild: Guild }).sort([['Guild', 'descending']]).exec();
      
       let embeds = []
       let i = 1;
      for (let a of all) {
         embed = new MessageEmbed()
           .setTitle(`Reaction role list in ${client.guilds.cache.get(Guild).name}!`)
          .setColor(client.rrColor)
        .addField(`${i++}:`, `**Guild**: [Click to go](https://discord.com/channels/${a.Guild}),\n**Channel**: <#${a.Channel}>,\n**Message**: [Click to see](https://discord.com/channels/${a.Guild}/${a.Channel}/${a.Message})\n**Emoji**: ${a.Emoji}\n**Role**: <@&${a.Role}>`);
        embeds.push(embed)

      
      }
        pagination({
            author: message.author,
      button: [
      {
        name: "first",
        emoji: "⏪",
        style: "SUCCESS",
      },
      {
        name: "last",
        emoji: "⏩",
        style: "SUCCESS",
      },
    ],
      channel: message.channel,
      embeds: embeds,
      time: 900000,
      fastSkip: true,
          })
 
      
  }) }
    client.logger.log(`NodeJS: NodeJS is currently running on version ${process.version.slice(1)}!`)

//ticket
const ticketSchema = require("./models/ticket")

client.createTicket = (User, Guild, Code, message) => {
   ticketSchema.findOne({ Guild: Guild }, async(err, data) => {
    if(err) throw err;
    if(data) {
      if (data.Code === Code) return client.logger.error(`Ticket: There is already a ticket with that code ${Code} to create!`)
    }
     try {
   const guild = client.guilds.cache.get(Guild)
const Channel = await guild.channels.create(`ticket ${Code}`, {
      type: 'GUILD_TEXT',
	    permissionOverwrites: [
         {
			   id: Guild,
		   	   deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL],
		     },
		     {
			     id: User,
			     allow: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL],
		     },
       ],
    });
   
    const embed = new MessageEmbed()
    .setTitle(`[${client.emoji.success}] Ticket #${Code}`)
    .setDescription("Thank you for contacting support! Your ticket code is **"+Code+"**!")
    .setAuthor(message.guild.name, client.user.displayAvatarURL({ dynamic: false }))
    .setColor("GREEN")


    const row = new MessageActionRow().addComponents(
      new MessageButton()
    .setLabel("Close/Delete this ticket")
    .setStyle("DANGER")
    .setEmoji("⛔")
    .setCustomId("close_ticket_button"),
    new MessageButton()
    .setLabel("Lock this ticket")
    .setStyle("SECONDARY")
    .setEmoji("🔒")
    .setCustomId("lock_ticket_button")
    )

    const filter = i => i.customId === 'close_ticket_button' && i.user.id === message.author.id;
       const collector = message.channel.createMessageComponentCollector({ filter, time: 15000000 });
      collector.on('collect', async i => {
    if (i.customId === 'close_ticket_button') {
        row.components.setDisabled(true)
    } else if (i.customId === 'lock_ticket_button') {
      row.components[1].setDisabled(true)
    }
    })
  
     Channel.send({embeds: [embed], components: [row]});

      
  let mew = new ticketSchema({
           Guild: Guild,
           User: User,
           Code: Code,
           Channel: Channel.id,
           Timestamp: new Date(),
         })
         mew.save()
    
 } catch (err) {
   return client.logger.error(`Ticket: An error occured while creating ticket! ${err}`)
 }
  })    
}
client.createTicketUsingButton = (User, Guild, Code, interaction) => {
   ticketSchema.findOne({ Guild: Guild }, async(err, data) => {
    if(err) throw err;
    if(data) {
      if (data.Code === Code) return client.logger.error(`Ticket: There is already a ticket with that code ${Code} to create!`)
    }
     try {
   const guild = client.guilds.cache.get(Guild)
const Channel = await guild.channels.create(`ticket ${Code}`, {
      type: 'GUILD_TEXT',
	    permissionOverwrites: [
         {
			   id: Guild,
		   	   deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL],
		     },
		     {
			     id: User,
			     allow: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL],
		     },
       ],
    });
   
    const embed = new MessageEmbed()
    .setTitle(`[${client.emoji.success}] Ticket #${Code}`)
    .setDescription("Thank you for contacting support! Your ticket code is **"+Code+"**!")
    .setAuthor(interaction.guild.name, client.user.displayAvatarURL({ dynamic: false }))
    .setColor("GREEN")


    const row = new MessageActionRow().addComponents(
      new MessageButton()
    .setLabel("Close/Delete this ticket")
    .setStyle("DANGER")
    .setEmoji("⛔")
    .setCustomId("close_ticket_button"),
    new MessageButton()
    .setLabel("Lock this ticket")
    .setStyle("SECONDARY")
    .setEmoji("🔒")
    .setCustomId("lock_ticket_button")
    )

    const filter = i => i.user.id === interaction.user.id;
       const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', filter, time: 15000000 });
      collector.on('collect', async i => {
    if (i.customId === 'close_ticket_button') {
        row.components[1].setDisabled(true)
        row.components[0].setDisabled(true)
    } else if (i.customId === 'lock_ticket_button') {
      row.components[1].setDisabled(true)
    }
    })
  
     Channel.send({embeds: [embed], components: [row]});


  let mew = new ticketSchema({
           Guild: Guild,
           User: User,
           Code: Code,
           Channel: Channel.id,
           Timestamp: new Date(),
         })
         mew.save()
    
 } catch (err) {
   return client.logger.error(`Ticket: An error occured while creating ticket! ${err}`)
 }
  })    
}
client.deleteTicket = async (Code, Guild, Channel) => {
 ticketSchema.findOne({ Guild: Guild, Code: Code }, async(err, data) => {
   if(err) throw err
   if(!data) return client.logger.error(`Ticket: Theres no ticket with code ${Code} to delete in guild ${Guild}!`);
    try {
   const guild = client.guilds.cache.get(Guild)
 const channel = guild.channels.cache.get(Channel)
   channel.setName(`closed ticket ${Code}`);
  setTimeout(() => {
    channel.delete().then(() => data.delete())
  }, 5000)
 } catch (err) {
   return client.logger.error(`Ticket: An error occured while deleting ticket! ${err}`)
 }
 })

}
client.listTicket = (Guild, message) => {
   const { pagination } = require('reconlx')
  ticketSchema.findOne({ Guild: Guild }, async (err, data) => {
    if(!data) return client.logger.error(`Ticket: Theres no tickets in guild ${Guild} to see list!`)
    else {
      let all = ticketSchema.find({ Guild: Guild }).sort([['Guild', 'descending']]).exec();
      
      let embeds = []
       let i = 1;
      for (let a of all) {
         const embed = new MessageEmbed()
           .setTitle(`Ticket list in ${client.guilds.cache.get(Guild).name}!`)
          .setColor(client.utilityColor)
        .addField(`${i++}:`, `**User**: <#${a.User}>,\n**Code**: ${a.Code},\n**Time**: ${a.Timestamp}`);
        embeds.push(embed)
      }
        pagination({
            author: message.author,
      button: [
      {
        name: "first",
        emoji: "⏪",
        style: "SUCCESS",
      },
      {
        name: "last",
        emoji: "⏩",
        style: "SUCCESS",
      },
    ],
      channel: message.channel,
      embeds: embeds,
      time: 50000,
      fastSkip: true,
          })
    }
  })
}

//music
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
var 
  clientID = process.env.SPOTIFY_CLIENT_ID,
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const { LavasfyClient } = require("lavasfy");

client.Lavasfy = new LavasfyClient(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        playlistLoadLimit: 3,
        audioOnlyResults: true,
        autoResolve: true,
        useSpotifyMetadata: true
      },
      [
        {
          id: client.config.music.lavalink.node.id,
          host: client.config.music.lavalink.node.host,
          port: client.config.music.lavalink.node.port,
          password: client.config.music.lavalink.node.password,
          secure: client.config.music.lavalink.node.secure,
        },
      ]
    );

client.music = new Manager({
  nodes: [{
    identifier: client.config.music.lavalink.node.id,
    host: client.config.music.lavalink.node.host,
    port: client.config.music.lavalink.node.port,
    password: client.config.music.lavalink.node.password,
    secure: client.config.music.lavalink.node.secure,
    retryDelay: client.config.music.lavalink.node.retryDelay
  }],
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
})
  .on("nodeConnect", node => client.logger.log(`Music: Lavalink node connected to ${node.options.identifier}.`))
  .on("nodeError", (node, error) => client.logger.error(`Music: An error occured while connecting to lavalink ${node.options.identifier}! Error: ${error.message}`.red
  ))
  .on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle(track.title)
        .setDescription(`[${client.emoji.music}] Now playing: \`${track.title}\`! [User: ${track.requester.tag}]`)
        .setThumbnail(player.queue.current.displayThumbnail())
      ]
    });
  })
  .on("queueEnd", player => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send(`[${client.emoji.success}] The queue has ended.`);
    player.destroy();
  });

client.on("raw", d => client.music.updateVoiceState(d));

//https (yes really no more http :D its also with express)
const httpXexpress = require("./server");
httpXexpress()