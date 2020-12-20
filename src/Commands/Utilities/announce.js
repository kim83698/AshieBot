const { MessageEmbed } = require(`discord.js`);
const Command = require('../../Structures/Command.js');
const config = require("../../../config")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Announce something!',
            category: 'Utilities',
        });
    }

    run(message, args) {



        if (!message.member.hasPermission('MANAGE_GUILD') && !config['owners'].includes(message.author.id)) return message.channel.send(`you do not have permission to use this`)

        let content = args.join(" ");

        const embed = new MessageEmbed()
            .setAuthor("New Announcement!", this.client.user.displayAvatarURL())
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(content)
            .setColor("RANDOM")
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()

        message.channel.send(embed)
        return;
    }
}