const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('XDDCraft Discord Bot is ready!');

}

const server = http.createServer(requestListener);
server.listen(8080);

const { Client, Collection } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);


client.login(process.env.BOT_TOKEN);


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
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageId} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageId} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageId} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

//Leveling

//Economy
const ecoSchema = require('./models/economy.js');
client.ecobal = (id) => new Promise(async ful => {
  const data = await ecoSchema.findOne({ id });
  if(!data) return ful(0);
  ful(data.coins)
})
client.addmoney = (id, coins) => {
  ecoSchema.findOne({id}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.coins += coins;
    } else {
      data = new ecoSchema({ id, coins })
    }
    data.save();
  })
}
client.rmvmoney = (id, coins) => {
  ecoSchema.findOne({id}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.coins -= coins;
    } else {
      data = new ecoSchema({ id, coins: -coins })
    }
    data.save();
  })
}
//bank
const bankSchema = require('./models/bank.js');
client.bankBal = (id) => new Promise(async ful => {
  const data = await bankSchema.findOne({ id });
  if(!data) return ful(0);
  ful(data.coins)
})
client.bankDeposit = (id, coins) => {
  bankSchema.findOne({id}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.coins += coins;
    } else {
      data = new bankSchema({ id, coins })
    }
    data.save();
  })
}
client.bankWithdraw = (id, coins) => {
  bankSchema.findOne({id}, async(err, data) => {
    if (err) throw err;
    if(data) {
      data.coins -= coins;
    } else {
      data = new bankSchema({ id, coins: -coins })
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
	return { buffer: canvas.toBuffer(), text: string };
};
