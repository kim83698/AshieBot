const Event = require('../../Structures/Event');
const db = require("quick.db")
const prefixes = require('../../../prefixes.json');
const logs = require('../../../logs.json');
const msFix = require("ms")
const fs = require("fs")
const { MessageEmbed } = require('discord.js');


//blacklist
module.exports = class extends Event {
    async run(message) {
        const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

        if (message.author.bot) return;

        if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${prefixes[message.guild.id] || '//'}\`.`);

        const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefixes[message.guild.id] || '//';
        if (!message.content.startsWith(prefix)) return;


        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {

            if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
                return message.reply('Sorry, this command can only be used by the bot owners.');
            }

            if (command.main) {
                return message.channel.send('sorry this command is under maintenance')
            }

            if (command.guildOnly && !message.guild) {
                return message.reply('Sorry, this command can only be used in a discord server.');
            }

            if (command.nsfw && !message.channel.nsfw) {
                return message.reply('Sorry, this command can only be ran in a NSFW marked channel.');
            }

            if (command.disabled) {
                return message.channel.send('sorry this command is disabled')
            }

            if (command.args && !args.length) {
                return message.reply(`Sorry, this command requires arguments to function. Usage: ${command.usage ?
                    `${this.client.prefix + command.name} ${command.usage}` : 'This command doesn\'t have a usage format'}`);
            }

            if (message.guild) {
                const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
                if (userPermCheck) {
                    const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
                    if (missing.length) {
                        return message.reply(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need them to use this command!`);
                    }
                }

                const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
                if (botPermCheck) {
                    const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
                    if (missing.length) {
                        return message.reply(`I am missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, I need them to run this command!`);
                    }
                }
            }
        }

        let user = db.fetch(`blacklist_${message.author.id}`)
        if (user == true) return message.channel.send(`you are blacklisted from using me`)
        command.run(message, args).catch(async function (error) {
            const e = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`An error has occoured:`)
                .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
                .addField(`My Developer has been notified of this. If this error prosists please dm my developer \`Kym.#2530\``, `\u200B`);
            await message.channel.send(e);
        })
    }
}