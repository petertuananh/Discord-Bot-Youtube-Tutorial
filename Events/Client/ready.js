const client = require("../../main.js");
const colors = require("colors")
const ascii = require('ascii-table');
const config = require('../../Settings/Configuration/config.json')
let table = new ascii("Bot Ready");
table.setHeading("Name", "Info");

client.once('ready', async () => {
    const user = client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)
    table.addRow(`Tag`, `${client.user.tag}`)
    table.addRow(`Guilds`, `${client.guilds.cache.size} guilds`)
    table.addRow(`Users`, `${user} users`)
    table.addRow(`Commands`, `${client.commands.size} commands`)
    table.addRow(`Credits`, `Source by Peter Tuan Anh`)
    console.log(colors.green(table.toString()));

    client.user.setActivity(config.setting.presence.activity, {
        status: config.setting.presence.status,
        type: config.setting.presence.type,
    })
})