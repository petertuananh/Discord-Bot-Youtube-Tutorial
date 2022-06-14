const Discord = require("discord.js");
const config = require('../../Settings/Configuration/config.json')
module.exports = {
    name: "avatar",
    aliases: ['av', 'avt', 'sav', 'pfp'],
    description: `Show avatar`,
    cooldown: 5,
    category: "Utility",
    ownerOnly : false,
    run: async (client, message, args, prefix) => {
        const embed = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle(`Show avatar`)
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(args[0])
        if (!user) {
            embed.setDescription(`> \`${message.member.user.tag}\` Avt\n> [Link](${message.member.user.displayAvatarURL({dynamic: true, size: 4096, type: "png"})})`)
            embed.setImage(message.member.user.displayAvatarURL({dynamic: true, size: 4096, type: "png"}))
            return message.reply({embeds : [embed]})
        } else {
            embed.setDescription(`> \`${user.user.tag}\` Avt\n> [Link](${user.displayAvatarURL({dynamic: true, size: 4096, type: "png"})})`)
            embed.setImage(user.displayAvatarURL({dynamic: true, size: 4096, type: "png"}))
            return message.reply({embeds : [embed]})
        }
    },
};
