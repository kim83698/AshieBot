const os = require('os');
const ms = require('ms');

const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');

const Command = require('../../Structures/Command');
const prefixes = require("../../../prefixes.json")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'stats',
            category: 'Information'
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        const amount = Object.keys(prefixes).length
        const msg = await message.channel.send('Fetching Data...')
        let f = '';
        this.client.ws.shards.map(shard => f += `${shard.ping}`)
        const latency = msg.createdTimestamp - message.createdTimestamp;
        const core = os.cpus()[0];
        const e = new MessageEmbed()
            .setThumbnail(this.client.user.avatarURL({ size: 512 }))
            .setColor('RANDOM')
            .setTimestamp()
            .addField(`Misc`, [
                `\`${this.client.commands.size}\` commands`,
                `\`${this.client.guilds.cache.size.toLocaleString()}\` guilds`,
                `\`${this.client.users.cache.size.toLocaleString()}\` users`,
                `\`${this.client.channels.cache.size.toLocaleString()}\` channels`
            ])
            .addField('System', [
                `**❯ Platform:** ${process.platform}`,
                `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                `**❯ CPU:**`,
                `\u3000 Cores: ${os.cpus().length}`,
                `\u3000 Model: ${core.model}`,
                `\u3000 Speed: ${core.speed.toLocaleString()}MHz`,
                `**❯ Memory:**`,
                `\u3000 Total: ${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
                `\u3000 Used: ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`
            ])
            .addField(` Bot Latency:`, [
                (`\`${latency}ms\``)
            ])
            .addField(`API Latency: `, [
                `\`${Math.round(Math.floor(this.client.ws.ping))}ms\``
            ])
            .addField(`Shard Ping:`, [
                `\`${Math.round(Math.floor(f))}ms\``
            ])
            .addField(`Versions:`, [
                `**❯ Node.js:** ${process.version}`,
                `**❯ Client Version:** v${version}`,
                `**❯ Discord.js:** v${djsversion}`,
            ])
            .addField(`Loaded:`,[
                `\`${this.client.events.size.toLocaleString()}\` events!`,
                `\`${this.client.shard.count}\` shards`,
                `\`${amount}\` prefixes`,
            ])
           
            .addField(`Staff:`, [
				`\`${(this.client.owners.length)}\` registered staff`,
            ])
        msg.edit(e)
    }
}

//Acknowledgements
