const db = require("quick.db");

const Command = require('../../Structures/Command');

const { MessageEmbed, WebhookClient } = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'blacklist',
            aliases: ["bl"],
            category: 'Owner',
            ownerOnly: true,
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        if (args.length < 1) return message.channel.send("please include an id")
        const user = this.client.users.cache.get(args[0]);
        if (user.id === '770335813979602974') return message.channel.send('you cannot black list yourself')

        if (!user) message.channel.send(`Invalid user or id ._.`);

        let fetched = db.fetch(`blacklist_${user.id}`)
        if (!fetched) {
            db.set(`blacklist_${user.id}`, true)
            message.channel.send(`Blacklisted!`);
            const d = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You have been blacklisted from ${this.client.user.username}, by ${message.author.username}, please dm (${message.author.tag}) in order to appeal`)
            user.send(d)
                .catch(async error => {
                    await message.channel.send(`cannot send messages to this user`)
                })
        } else {//'user created', userId
            message.channel.send(`This user is already blacklisted?`);
        }
    }
}