// Tictactoe added by Hasibix#0001 & Vessel#9966 & KresStew#6666.

const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    aliases: ["ttt", "xno"],
    description : 'type .tictactoe to play the tictactoe game',
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}