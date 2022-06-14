const Discord = require("discord.js");
const config = require('../../Settings/Configuration/config.json')
module.exports = {
    name: "kick",
    aliases: ['k'],
    description: `Kick a user`,
    cooldown: 5,
    category: "Moderation",
    ownerOnly : false,
    run: async (client, message, args, prefix) => {
        const embed = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle(`Kick command`)
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(args[0])
        if (!user) {
            embed.setDescription(`> \`❌\` Must provide a user!`)
            return message.reply({embeds : [embed]})
        } else {
            if (message.member.roles.highest.position <= user.roles.highest.position) {
                embed.setDescription(`> \`❌\` You can't kick this user`)
                return message.reply({embeds : [embed]})
            } else if (!user.kickable) {
                embed.setDescription(`> \`❌\` I can't kick this user`)
                return message.reply({embeds : [embed]})
            } else {
                await user.kick(`Kicked by ${message.member.user.tag}`)
                embed.setDescription(`> \`✔️\` Kicked ${user}`)
                return message.reply({embeds : [embed]})
            }
        }
        
    },
};
