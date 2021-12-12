const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
require("dotenv").config();
const mongooseConnectionString = process.env.MONGO_DB;
const mongoose = require("mongoose");
const colors = require("colors")
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);

      
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if(file.permissions) file.defaultPermissions = false;
        arrayOfSlashCommands.push(file);
    });

     client.on("ready", async() => {
       
        await client.application.commands.set(arrayOfSlashCommands);
     })
    // mongoose
    const mongooseConnectionString = process.env.MONGO_DB;
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => client.logger.log(`Mongoose: Connected to mongodb`));
};