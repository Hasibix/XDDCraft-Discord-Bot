const ms = require('ms');
const messages = require("../../utils/messages");

module.exports = {
    
    name: "giveaway-start",
    description: 'Start a giveaway',
    permissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'duration',
            description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'How many winners the giveaway should have',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the giveaway should be',
            type: 'STRING',
            required: true
        },
        {
            name: 'channel',
            description: 'The channel to start the giveaway in',
            type: 'CHANNEL',
            required: true
        }
    ],

    run: async (client, interaction) => {

        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayDuration = interaction.options.getString('duration');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
        
        if(!giveawayChannel.isText()) {
            return interaction.followUp({
                content: '['+client.config.error+'] Selected channel is not text-based.',
                ephemeral: true
            });
        }
    
        // Start the giveaway
        client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            duration: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: giveawayWinnerCount,
            // Who hosts this giveaway
            hostedBy: client.config.hostedBy ? interaction.user : null,
            // Messages
            messages
        });
    
        interaction.followUp({content: `[${client.config.success}] Giveaway started in ${giveawayChannel}!`});
    
    } 

};