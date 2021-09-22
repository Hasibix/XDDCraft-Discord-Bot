const ms = require('ms');

module.exports = {
    
    name: "giveaway-end",
    description: 'End a giveaway',
    
    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to end (message ID or giveaway prize)',
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
                content: '['+client.config.error+'] Unable to find a giveaway for `'+ query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.followUp({
                content: '['+client.config.error+'] This giveaway is already ended.',
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            interaction.followUp({ content: '['+client.config.success+'] Giveaway ended!' });
        })
        .catch((e) => {
            interaction.followUp({
                content: e,
                ephemeral: true
            });
        });

    }
};