const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'msg',
            category: `Owner`,
            ownerOnly: true
        });
    }

    async run(message, args) {
        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!user) return message.channel.send('you did not mention a user or you gave an invalid ID')
        if (!args.slice(1).join(" ")) return ("you did not specify your message");
        user.user.send(new MessageEmbed().addField(`${message.author.username} has sent you a message!\n They said:`, [`\u200b`, args.slice(1).join(" ")]).setColor("RANDOM")).catch(function () {
            return message.channel.send('This user cannot be dmed, most likely they have dms off');
        }).then(function () {
            return message.channel.send(`message sent to ${user.user.tag}`);
        })
    }
}