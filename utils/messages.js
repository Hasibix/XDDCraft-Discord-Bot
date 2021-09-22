const config = require('../config.json');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY** 🎉",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"😢 **GIVEAWAY ENDED** 😢",
    inviteToParticipate: "React with 🎉 to participate!",
    dropMessage: "Be the first to react with 🎉 !",
    drawing: 'Ends in: {timestamp}',
    winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
    embedFooter: "Started at",
    noWinner: "Giveaway cancelled, no valid participations.",
    hostedBy: "Hosted by: {this.hostedBy}",
    winners: "winner(s)",
    endedAt: "Ended at"
};