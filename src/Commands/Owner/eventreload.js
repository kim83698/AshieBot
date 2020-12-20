const Command = require('../../Structures/Command');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'eventreload',
            aliases: ["er"],
            category: 'Owner',
            ownerOnly: true,
            main: true
        });
    }

    /**
     * @param {Message} message
     * @param {string[]) args
     */
    async run(message, args) {
        const event = args[0];
        if (!event) {
            const noCMD = new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Please enter the event name for reload!`)
                .setTimestamp();
            return message.channel.send(noCMD);
        }

        const events = this.client.events.get(event);
        if (events) {
            let File = null;
            if(events.category != null) {
                delete require.cache[require.resolve(`../../Events/${events.category}/${(events.name)}.js`)];

                File = require(`../../Events/${events.category}/${(events.name)}.js`);
            } else {
                delete require.cache[require.resolve(`../../Events/${(events.name)}.js`)];

                File = require(`../../Events/${(events.name)}.js`);
            }
            
            const Event = new File(this.client, events.name);

            this.client.events.delete(events.name);
            await this.client.events.set(events.name, Event);

            const restartedCMD = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`event **${events.name}** has been reloaded!`)
                .setTimestamp();
            return message.channel.send(restartedCMD);
        } else {
            const notFound = new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Could not find event named **${event}**!`)
                .setTimestamp();
            return message.channel.send(notFound);
        }
    }
}