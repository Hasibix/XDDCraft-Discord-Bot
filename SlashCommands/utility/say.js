const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "say",
    description: "says your chat lol",
    options: [{ name: "text", description: "Idk", type: "STRING", required: true }],
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const string = interaction.options.getString("text")
        interaction.followUp({ content: `${string}` });
    },
};