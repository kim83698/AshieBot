const Command = require('../../Structures/Command');
const GardenBotEmbed = require('../../Structures/GardenBotEmbed');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'invite',
            category: 'Utilities',
            aliases: ["inv"]

        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        const e = new GardenBotEmbed()
            .setThumbnail(this.client.user.avatarURL({ size: 512 }))
            .setColor("RANDOM")
            .addField(`Heres My Stats ${message.author.username}`, [
                `\`${this.client.guilds.cache.size.toLocaleString()}\` guilds!`,
                `\u200b`,
                `\`${this.client.users.cache.size.toLocaleString()}\` users!`,
                `\u200b`,
                `\`${this.client.channels.cache.size.toLocaleString()}\` channels!`
            ])
            .addField(`Invite ${this.client.user.username}`, [
                `\u200b`,
                `[Invite With Needed Permissions](https://discord.com/oauth2/authorize?client_id=779734377780477982&scope=bot&permissions=872508647)`,
                `\u200b`,
                `[Invite With Admin](https://discord.com/oauth2/authorize?client_id=779734377780477982&scope=bot&permissions=8)`,
                `\u200b`,
                `[Invite With 0 Permissions](https://discord.com/oauth2/authorize?client_id=779734377780477982&scope=bot)\nNot Recommended^`
            ])
        message.channel.send(e)
    }

};
