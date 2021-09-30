//Added By Hasibix#0001

const { MessageEmbed } = require("discord.js");
const { Snake } = require("weky")
module.exports = {
    name: "snake",
    description: "the snake game",
    run: async(client, message, args) => {
      await Snake({
	message: message,
	embed: {
		title: 'Snake for '+message.author.tag+'',
		description: 'GG, you scored **{{score}}** points!',
		color: '#5865F2',
        footer: 'Credits to weky developper!',
		timestamp: true
	},
	emojis: {
		empty: '⬛',
		snakeBody: '🟩',
		food: '🍎',
		up: '⬆️',
		right: '⬅️',
		down: '⬇️',
		left: '➡️',
	},
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttonText: 'Cancel'
});
    }
}