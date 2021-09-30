const { Client, Collection } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: 32767,
});

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);
module.exports = client;
client.login(process.env.BOT_TOKEN);

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

//ReactionRoles
const react = require("mongodb-reaction-role");
client.react = new Map(); 
client.fetchforguild = new Map();
react.setURL(process.env.MONGO_DB).then(() => {
  console.log("Reaction role is successfully connected with mongodb!")
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

client.captcha = function() {
	const canvas = Canvas.createCanvas(400, 180);
	const ctx = canvas.getContext('2d');
	const num = 5;
	const cords = [];
	const colors = ['blue', 'red', 'green', 'yellow', 'black', 'white'];
	let string = '';
	const particles = Math.floor(Math.random() * 101);
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const charactersLength = characters.length;
	for (var i = 0; i < 5; i++) {
		string += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	ctx.font = 'bold 100px Roboto';
	ctx.lineWidth = 7.5;
	let textPos = 45;
	for (var i = 0; i < string.length; i++) {
		const char = string.charAt(i);
		const color = colors[Math.floor(Math.random() * colors.length)];
		ctx.fillStyle = color;
		ctx.fillText(char, textPos, 120);
		textPos += 65;
	}
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
	let x = 0;
	for (var i = 0; i < num + 1; i++) {
		const l = Math.floor(Math.random() * canvas.height);
		if (i != 0) x += canvas.width / num;
		cords.push([x, l]);
	}
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
	return { buffer: canvas.toBuffer(), text: string };
};

//http server (adding socket.io sooner :D) 
setTimeout(() => {
  const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Bot is ready!');

}

const server = http.createServer(requestListener);
server.listen(8080);
console.log("http server ready")
}, 5000)

//level


const levelSchema = require('./models/levels.js');
client.checkXP = (User) => new Promise(async ful => {
  const data = await levelSchema.findOne({ User });
  if(!data) return ful(0);
  if(!data.XP || data.XP === null) return ful(0)
  ful(data.XP)
})
client.addXP = (User, Amount) => {
  levelSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.XP += Amount;
    } else {
      data = new levelSchema({ User: User, XP: Amount })
    }
    data.save();
  })
}
client.removeXP = (User, Amount) => {
  levelSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.XP -= Amount;
    } else {
      data = new levelSchema({ User: User, XP: -Amount })
    }
    data.save();
  })
}
client.checkLevel = (User) => new Promise(async ful => {
  const data = await levelSchema.findOne({ User });
  if(!data) return ful(0);
  if(!data.Level) return ful(0);
  ful(data.Level)
})
client.addLevel = (User, Amount) => {
  levelSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.Level += Amount;
    } else {
      data = new levelSchema({ User: User, Level: Amount })
    }
    data.save();
  })
}

client.removeLevel = (User, Amount) => {
  levelSchema.findOne({User}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.Level -= Amount;
    } else {
      data = new levelSchema({ User: User, Level: -Amount })
    }
    data.save();
  })
}
//mod
   