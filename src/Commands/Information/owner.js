const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'owner',
            category: 'Information'
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let guild = this.client.guilds.cache.get(args[0]) || message.guild;
        const e = new MessageEmbed()
            .setTitle(`Owner info for ${guild.name}`)
            .setTimestamp()
            .setColor('RANDOM')
            .addField(`**Guild Name**`, [
                `${guild.name}`
            ])
            .addField(`**Guild Owner**`, [
                `${guild.owner.user.tag}`
            ])
            .addField(`**Guild Owner ID:**`, [
                `${guild.owner.id}`
            ])
        message.channel.send(e)
    }
};
