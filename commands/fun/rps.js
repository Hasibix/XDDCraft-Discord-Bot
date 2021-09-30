//Added By Hasibix#0001

const { MessageEmbed } = require("discord.js");
const { RockPaperScissors } = require("weky")
module.exports = {
    name: "rps",
    description: "rock, paper, scissors!!",
    run: async(client, message, args) => {
    let opponent = message.mentions.users.first();
    if(!opponent) return message.channel.send(`[${client.config.warning}] Please specify a opponent to play this game!`)
      await RockPaperScissors({
	message: message,
	opponent: opponent,
	embed: {
		title: 'Rock Paper Scissors',
		description: 'Press the button below to choose your element.',
		color: '#5865F2',
        footer: 'Credits to weky developer!',
		timestamp: true
	},
	buttons: {
		rock: 'Rock',
		paper: 'Paper',
		scissors: 'Scissors',
		accept: 'Accept',
		deny: 'Deny',
	},
	time: 60000,
	acceptMessage:
		'<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!',
	winMessage: 'GG, <@{{winner}}> won!',
	drawMessage: 'This game is deadlock!',
	endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
	timeEndMessage:
		"Both of you didn't pick something in time. So, I dropped the game!",
	cancelMessage:
		'<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!',
	choseMessage: 'You picked {{emoji}}',
	noChangeMessage: 'You cannot change your selection!',
	othersMessage: 'Only {{author}} can use the buttons!',
	returnWinner: false
});
    }
}