const Command = require('../../Structures/Command');
const GardenBotEmbed = require('../../Structures/GardenBotEmbed');

const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
const response = choices[Math.floor(Math.random() * choices.length)];



module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
			category: 'Utilities'
		});
	}

	async run(message, args, client) {
		let f = '';
		this.client.ws.shards.map(shard => f += `${shard.ping}`)
		const msg = await message.channel.send('Pinging...');
		const latency = msg.createdTimestamp - message.createdTimestamp;
		const e = new GardenBotEmbed()
		.setColor("RANDOM")
			.addField(` Bot Latency:`, [
				(`\`${latency}ms\``)
			])
			.addField(`API Latency: `, [
				`\`${Math.round(Math.floor(this.client.ws.ping))}ms\``
			])
			.addField(`Shard Ping:`, [
				`\`${Math.round(Math.floor(f))}ms\``
			])

		msg.edit(response, e);
	}

};
