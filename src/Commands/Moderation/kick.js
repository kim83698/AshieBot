const Command = require('../../Structures/Command.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: `Kicks a user from the guild`,
            category: `Moderation`,
            usage: `[user] [reason]`,
            args: true
        });
    }

    async run(message, args) {
        const tag = `<@${message.member.id}>`
        if (message.member.hasPermission(`ADMINISTRATOR`) || message.member.hasPermission(`KICK_MEMBERS`)) {

            const target = message.mentions.users.first()
            const targetMember = message.guild.members.cache.get(target.id)

            if (target) {
                if (targetMember.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`${tag}, This user cannot be kicked.`)

                let reason = args[1]

                targetMember.kick({ reason: args[1] } || 'No reason provided')
                message.channel.send(`${tag}, User has been kicked. Reason: ${reason}`)
            }

        } else {
            message.channel.send(`${tag}, You do not have permission to do that.`)
        }
    }
}