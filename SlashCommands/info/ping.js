const { Message, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    description: "lol",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    permissions: ["ADMINISTRATOR"],
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `${client.ws.ping} ws ping` });
    },
};