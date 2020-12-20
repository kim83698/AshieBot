const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js");
const os = require('os');


const regions = {
    'brazil': 'Brazil',
    'europe': 'Europe',
    'hongkong': 'Hong Kong',
    'india': 'India',
    'japan': 'Japan',
    'russia': 'Russia',
    'singapore': 'Singapore',
    'southafrica': 'South Africa',
    'sydney': 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'debug',
            category: 'Information',
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        const guild = this.client.guilds.cache.get(args[0]) || message.guild
        const e = new MessageEmbed()
            .setAuthor(`Debug info for ${guild.name}`)
            .setColor(`RANDOM`)
            .addField(`Guild ID`, [
                `**${guild.id}**`
            ])
            .addField(`Shard:`, [
                `**${guild.shard.id} / ${this.client.shard.count}**`
            ])
            .addField(`Region:`, [
                `**${regions[guild.region]}**`
            ])
        message.channel.send(e)
    }
}