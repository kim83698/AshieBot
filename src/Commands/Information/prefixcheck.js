const prefixes = require("../../../prefixes.json")

const Command = require('../../Structures/Command');

const { MessageEmbed } = require("discord.js");

const amount = Object.keys(prefixes).length

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'prefixes',
            category: 'Information',
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        const guild = this.client.guilds.cache.get(args[0]) || message.guild;
        const e = new MessageEmbed()
            .setTitle(`${guild.name}\'s prefix info`)
            .addField(`Total Registered Prefixes Count:`, [
                `${amount}`
            ])
            .addField(`${guild.name}'s prefix`, [
                `${prefixes[guild.id] || '//'}`
            ])

        message.channel.send(e)
    }
}

//Acknowledgements