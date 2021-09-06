const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');
module.exports= (client) => {
    readdirSync('./mCommands/').forEach(dir => {
        const commands = readdirSync(`./mCommands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../mCommands/${dir}/${file}`);
            if(pull.name){
                client.commands.set(pull.name, pull);
                table.addRow(file,'✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    
 readdirSync("./mEvents/").forEach((file) => {
    const events = readdirSync("./mEvents/").filter((file) =>
      file.endsWith(".js")
    );

    for (let file of events) {
      let pull = require(`../mEvents/${file}`);

      if (pull.name) {
        client.events.set(pull.name, pull);
      } else {
        continue;
      }
    }
  });
    console.log(table.toString());
}