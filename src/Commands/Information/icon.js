const Command = require('../../Structures/Command');
const GardenBotEmbed = require('../../Structures/GardenBotEmbed');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'icon',
            category: 'Information',
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let guild = this.client.guilds.cache.get(args[0]) || message.guild
        if (guild.iconURL() < 1) return message.channel.send(`no icon set`)
        const e = new GardenBotEmbed()
            .setColor('RANDOM')
            .setTitle(`${guild.name}'s icon`)
            .setImage(`${guild.iconURL({ format: "png", dynamic: true, size: 2048 })}`)
            .setTimestamp()
        message.channel.send(e);
    }

};
