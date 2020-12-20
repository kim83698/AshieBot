const config = require("../../../config")

const prefixes = require("../../../prefixes.json")

const Command = require('../../Structures/Command');

const fs = require("fs");

const { MessageEmbed, WebhookClient } = require("discord.js");


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'prefix',
            category: 'Utilities',
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        if (args.length < 1) return await message.channel.send('no prefix provided');
        if (args.length > 4) return message.channel.send(`too many characters`)
        let prefix = args[0];
        if (!message.member.hasPermission('MANAGE_GUILD') && !config['owners'].includes(message.author.id)) return message.channel.send(`you do not have permission to change my prefix`)
        if (prefix === prefixes[message.guild.id]) return await message.channel.send('prefix is the same')
        prefixes[message.guild.id] = prefix;
        fs.writeFile('./prefixes.json', JSON.stringify(prefixes), 'utf8', async () => {
            await message.channel.send(`Prefix set to ${prefix}`);
        });
    }
}

//Acknowledgements
