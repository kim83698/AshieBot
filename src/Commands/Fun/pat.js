const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js")
const superagent = require('superagent');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'pat',
            category: 'Fun'
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        if (!args[0]) return message.reply("You did not mention a user to pat!")
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply("The user given is not a member of this server!")

        let muser = member.user

        const { body } = await superagent.get("https://some-random-api.ml/animu/pat");

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(`${body.link}`)
        message.channel.send(`${muser.username}, you have received a pat from ${message.author.username} Awwwwww`, { embed });
    }
}