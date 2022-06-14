const Discord = require("discord.js");
const config = require('../../Settings/Configuration/config.json')
module.exports = {
    name: "ping",
    aliases: ['p'],
    description: `Check ping`,
    cooldown: 5,
    category: "Information",
    options1: `ping`,
    ownerOnly : false,
    run: async (client, message, args, prefix) => {
        const msg = await message.reply(`Checking ping...`)

        const pingBOT = msg.createdTimestamp - message.createdTimestamp

        const pingEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`**🏓  Ping**`)
            .setDescription(`**・Bot Ping : ${pingBOT} ms\n・WS Ping : ${client.ws.ping} ms**`)
        await message.channel.send({
            embeds: [pingEmbed]
        })
        return msg.delete()
    },
};
