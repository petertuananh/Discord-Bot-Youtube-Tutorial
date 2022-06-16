const Discord = require("discord.js");
const config = require('../../Settings/Configuration/config.json')
module.exports = {
    name: "ban",
    aliases: ['b'],
    description: `Ban a user`,
    cooldown: 5,
    category: "Moderation",
    ownerOnly : false,
    run: async (client, message, args, prefix) => {
        const embed = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle(`Ban command`)
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(args[0])
        if (!user) {
            embed.setDescription(`> \`❌\` Must provide a user!`)
            return message.reply({embeds : [embed]})
        } else {
            if (message.member.roles.highest.position <= user.roles.highest.position) {
                embed.setDescription(`> \`❌\` You can't ban this user`)
                return message.reply({embeds : [embed]})
            } else if (!user.bannable) {
                embed.setDescription(`> \`❌\` I can't ban this user`)
                return message.reply({embeds : [embed]})
            } else {
                await user.ban({reason: `Banned by ${message.member.user.tag}`})
                embed.setDescription(`> \`✔️\` Banned ${user}`)
                return message.reply({embeds : [embed]})
            }
        }
        
    },
};
