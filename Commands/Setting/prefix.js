const {
    MessageEmbed
} = require("discord.js");
const db = require("quick.db");
const config = require('../../Settings/Configuration/config.json')

module.exports = {
    name: "prefix",
    aliases: ["pf"],
    description: "Config prefix",
    cooldown: 5,
    UserPerms: ["ADMINISTRATOR"],
    // BotPerms: ["ADMINISTRATOR"],
    usage: `${config.prefix}prefix`,
    options1: `prefix set`,
    options2: `prefix reset`,
    category: "Setup",
    ownerOnly: false, // [True, False]

    run: async (client, message, args) => {
        const choice = args[0];
        const newprefix = args[1];
        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`**Prefix**`)
            .setFooter(`Made by ` + client.user.username + ` BOT`)

        if (!choice) {
            embed.setDescription(`**・Please choice set or reset mode !**`)
            return message.channel.send({
                embeds: [embed]
            })
        }

        if (choice == "set") {
            if (!newprefix) {
                embed.setDescription(`**・Please select the prefix you want !**`)
                return message.channel.send({
                    embeds: [embed]
                })
            }

            if (newprefix.length > 2) {
                embed.setDescription(`**・No more than two characters !**`)
                return message.channel.send({
                    embeds: [embed]
                })
            }

            embed.setDescription(`**・Successful prefix change\n・New Prefix : \`${newprefix}\`**`)
            message.channel.send({
                embeds: [embed]
            })

            db.set(`prefix_${message.guild.id}`, newprefix);
        }

        if (choice == "reset") {
            embed.setDescription(`**・Prefix has been reset : \`${config.prefix}\`**`)
            message.channel.send({
                embeds: [embed]
            })

            db.delete(`prefix_${message.guild.id}`);
        }


    }
}