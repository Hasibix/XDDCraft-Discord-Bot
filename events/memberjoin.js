const client = require("../index.js");
const createCaptcha = require('../captcha');
const fsC = require('fs').promises;

client.on('guildMemberAdd', async member => {
      if(member.bot) return;

      await member.roles.add('884717884188819476');

    const captcha = await createCaptcha();
    try {
        const msg = await member.send('You have 30 sec to solve the captcha', {
            files: [{
                attachment: `./captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('You entered the captcha incorrectly. Rejoin the server!');
                    member.kick()
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time']});
            if(response) {
                await msg.channel.send('You have verified yourself!');
                await member.roles.remove('884717884188819476');
                await member.roles.add('884717954170757160');
                await fsC.unlink(`./captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time.');
            await member.kick();
            await fsC.unlink(`./captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});


