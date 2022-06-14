const client = require("../../main.js");
var config = require("../../Settings/Configuration/config.json");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Map();

client.on('messageCreate', async (message) => {

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setFooter(`Made by ` + client.user.username + ` BOT`)

    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix === null) {
        prefix = config.setting.prefix
    };

    if (!message.guild) return;
    if (message.author.bot) return;

    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();

    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) {
        embed.setTitle(`**Command**`)
        embed.setDescription(`**・You must enter a valid command !**`)
        return message.channel.send({
            embeds: [embed]
        });
    };
    if (command) {

        // Command Cooldown
        if (!cooldown.has(command.name)) {
            cooldown.set(command.name, new Discord.Collection())
        }

        const currentTime = Date.now()
        const timeStamps = cooldown.get(command.name)
        const cooldownAmount = (command.cooldown) * 1000

        if (message.author.id !== config.ownerID) {
            if (timeStamps.has(message.author.id)) {
                const expTime = timeStamps.get(message.author.id) + cooldownAmount
                if (currentTime < expTime) {
                    const timeLeft = (expTime - currentTime) / 1000
                    embed.setTitle(`**Cooldown**`)
                    embed.setDescription(`**・Please wait for ${timeLeft.toFixed(1)}s**`)
                    // embed.setDescription(`**・Please wait for \`${timeLeft.toFixed(1)}\` then use \`${config.setting.prefix}${command.name}\` !**`)
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
            timeStamps.set(message.author.id, currentTime)
            setTimeout(() => {
                timeStamps.delete(message.author.id)
            }, cooldownAmount)
        }



        // Checking Permissions
        if (!message.guild.me.permissions.has(["SEND_MESSAGES", "EMBED_LINKS"])) {
            embed.setTitle(`**Permissions**`)
            embed.setDescription(`**・Need : \`SEND MESSAGES\`, \`EMBED LINKS\`**`)
            return message.member.send({
                embeds: [embed]
            })
        }

        if (!message.member.permissions.has(command.UserPerms || [])) {
            embed.setTitle(`**Permissions**`)
            embed.setDescription(`**・Need : \`${command.UserPerms || []}\`**`)
            return message.channel.send({
                embeds: [embed]
            })
        }

        if (!message.guild.me.permissions.has(command.BotPerms || [])) {
            embed.setTitle(`**Permissions**`)
            embed.setDescription(`**・Need : \`${command.BotPerms || []}\`**`)
            return message.channel.send({
                embeds: [embed]
            })
        }

        if (command.ownerOnly) {
            if (message.author.id !== config.setting.ownerId) {
                embed.setTitle(`**Permissions**`)
                embed.setDescription(`**・Hey ${message.member.user.username} !\n・Limited this commands to owners only**`)
                return message.channel.send({
                    embeds: [embed]
                })
            }
        }
        command.run(client, message, args, prefix)
    } 
})