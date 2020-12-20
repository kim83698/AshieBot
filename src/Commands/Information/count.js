const { MessageEmbed } = require("discord.js");

const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'count',
            category: 'Information',

        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        const e = new MessageEmbed()
            .setTimestamp()
            .setColor(`RANDOM`)
            .setAuthor(`User Count Info for ${this.client.user.tag}`)
            .setDescription(`i currently am in \`${this.client.guilds.cache.size.toLocaleString()}\` guilds, with \`${this.client.users.cache.size.toLocaleString()}\` users`)
        message.channel.send(e)
    }
}
