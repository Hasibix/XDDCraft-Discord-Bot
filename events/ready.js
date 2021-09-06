const client = require("../index.js");
const Discord = require("../index.js");

client.on('ready', () => {
    setInterval(() => {
        const statuses = [
            `XDDhelp | play.xddcraft.net`,
            `XDDhelp | play.xddcraft.net`,
            `XDDhelp | play.xddcraft.net`,
            `XDDhelp | play.xddcraft.net`,
        ]
        const presenseTypes = [
            `PLAYING`,
            `STREAMING`,
            `WATCHING`,
            `LISTENING`,
        ]
        const presenses = [
            `online`,
            `streaming`,
            `dnd`,
            `idle`,
        ]
        const presence = presenses[Math.floor(Math.random() * presenses.length)]
        const presenceType = presenseTypes[Math.floor(Math.random() * presenseTypes.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: presenceType})
    }, 6000)
    console.log(`${client.user.username} ✅`)

    })