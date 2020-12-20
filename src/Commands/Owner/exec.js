const Command = require('../../Structures/Command');
const { exec } = require("child_process")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'exec',
            category: 'Owner',
            aliases: ['bash'],
            ownerOnly: true,
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        if (!args.length) return message.channel.send('You must provide something to execute.');
        exec(args.join(" "), (error, stdout) => {
            const response = stdout || error;
            message.channel.send(response, { split: true })
            .catch(async error => {
                await message.channel.send(`Must be 2000 or fewer in length.`)
            })
        })
    }
};
