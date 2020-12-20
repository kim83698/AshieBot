const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js")
const { ShardingManager } = require('discord.js');

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
            name: 'shardinfo',
            aliases: ['shard', 'shards'],
            category: 'Information'
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args, client) {
        let f = '';
        this.client.ws.shards.map(shard => f += `${shard.ping}`)
        const embed = new MessageEmbed().setDescription(`**Shard Count: (${this.client.shard.count})**`).setTitle(`Shard info for \n**${message.guild.name}**`)
        const values = await this.client.shard.broadcastEval(`({guilds: this.guilds.cache.size, users: this.users.cache.size})`);

        values.map((val, i) => (embed.description += `\n **Shard ID:** ${i}\n**Users:** ${val.users.toLocaleString()}\n**Guilds:** ${val.guilds.toLocaleString()}\n **Region:** ${regions[message.guild.region]}\n**Shard Ping:** ${Math.round(Math.floor(f))}ms\n`))

        return message.channel.send(embed);
    }
}