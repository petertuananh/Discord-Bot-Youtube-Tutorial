console.clear()
const { Client, Collection } = require('discord.js');
const config = require('./Settings/Configuration/config.json')
const fs = require("fs");

const client = new Client({
    partials: ["USER", "CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
    fetchAllMembers: true,
    failIfNotExists: false,
    // shards: "auto",
    allowedMentions: {
        parse: [
            'users',
            'roles' // no 'everyone'
        ],
        repliedUser: false
    },
    intents: 32767,
});

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.embedCollection = new Collection();
client.interactions = new Collection();
client.categories = fs.readdirSync("./Commands/");

["commandHandler", "eventHandler"/*, "SlashCommands"*/].forEach(handler => {
    require(`./Handlers/${handler}`)(client);
});

process.on('unhandledRejection', err => {
    console.log(`[System] Unhandled Promise Rejection: ${err.message}`);
    console.log(err);
});

client.login(config.discord.token);