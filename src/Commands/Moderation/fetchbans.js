const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'fetchbans',
            aliases:["ft"],
            category: 'Moderation',
        });
    }

    async run(message, args) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
            return message.channel.send(`I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Ban Members\" permission.`);
        const guild = this.client.guilds.cache.get(args[0]) || message.guild;
            guild.fetchBans().then(async function (bans) {
            message.channel.send(`server ("${guild.name}") has **${bans.size}** banned ${bans.size === 1 ? "user" : "users"}.`);
        }).catch(function (error) {
            console.error(error);
            return message.channel.send(`An error occurred:\n\`\`\`js\n${error.stack}\`\`\``);
        });
    }
}