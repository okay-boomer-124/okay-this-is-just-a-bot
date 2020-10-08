const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {

  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);

  console.log(`Loading command ${command.name}`);
}

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      
      let eventName = file.split(".")[0];

      client.on(eventName, event.bind(null, client));
     
      console.log(`Loading event ${eventName}`)

      delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.login("");
