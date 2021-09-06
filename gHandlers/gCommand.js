const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');
module.exports= (client) => {
    readdirSync('./gCommands/').forEach(dir => {
        const commands = readdirSync(`./gCommands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../gCommands/${dir}/${file}`);
            if(pull.name){
                client.commands.set(pull.name, pull);
                table.addRow(file,'✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    
 readdirSync("./gEvents/").forEach((file) => {
    const events = readdirSync("./gEvents/").filter((file) =>
      file.endsWith(".js")
    );

    for (let file of events) {
      let pull = require(`../gEvents/${file}`);

      if (pull.name) {
        client.events.set(pull.name, pull);
      } else {
        continue;
      }
    }
  });
    console.log(table.toString());
}