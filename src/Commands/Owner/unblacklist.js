const db = require("quick.db");

const MessageEmbed = require("discord.js")

const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'unblacklist',
            aliases: ["ub"],
            category: 'Owner',
            ownerOnly: true,
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        if (args.length < 1) return message.channel.send("please include an id")

        const user = this.client.users.cache.get(args[0]);
        if (!user) return message.channel.send(`Invalid user or id ._.`);

        let fetched = db.fetch(`blacklist_${user.id}`)
        if (!fetched) {
            return message.channel.send(`This user is not blacklisted`);
        } else {
            db.delete(`blacklist_${user.id}`)
            message.channel.send(`Unblacklisted!`)
           
        }
    }
}