module.exports = {
    name: 'giveaway-reroll',
    description: 'Reroll a giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to reroll (message ID or prize)',
            type: 'STRING',
            required: true
        }
    ],
    permissions: ["ADMINISTRATOR"],
    run: async (client, interaction) => {



        const query = interaction.options.getString('giveaway');

        // try to found the giveaway with prize then with ID
        const giveaway = 
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return interaction.followUp({
                content: '['+client.config.error+'] Unable to find a giveaway for `'+ query +'`.',
                ephemeral: true
            });
        }

        if (!giveaway.ended) {
            return interaction.followUp({
                content: '['+client.config.error+'] The giveaway is not ended yet.',
                ephemeral: true
            });
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageId)
        .then(() => {
            // Success message
            interaction.followUp({content: '['+client.config.success+'] Giveaway rerolled!'});
        })
        .catch((e) => {
            interaction.followUp({
                content: e,
                ephemeral: true
            });
        });

    }
};