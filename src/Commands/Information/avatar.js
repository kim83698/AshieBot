const Command = require('../../Structures/Command');
const GardenBotEmbed = require('../../Structures/GardenBotEmbed');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'avatar',
            category: 'Information',
            aliases: ['av']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        let c = ""

        if (member) {
            c = member.user
        } else if (!args[0]) {
            member = message.author
            c = message.author
        } else if (!member) {
            return message.channel.send("Mention a valid user or a user's id who belongs in this server. To view your avatar, simply say ``sl!avatar``.")
        }
        const e = new GardenBotEmbed()
            .setColor('RANDOM')
            .setTitle(`${c.username}'s avatar`)
            .setImage(`${c.displayAvatarURL({ format: "png", dynamic: true, size: 2048 })}`)
            .setTimestamp()
        message.channel.send(e);
    }

};
