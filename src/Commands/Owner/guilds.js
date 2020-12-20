const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'guilds',
            category: 'Owner',
            ownerOnly: true,
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        const e = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Guild info for ${this.client.user.tag}`)
            .addField(`Guild name:[${this.client.guilds.cache.size}]`, [
                `${this.client.guilds.cache.map(g => g.name).join(", ")}`
            ])
        message.channel.send(e)
    }
}

//