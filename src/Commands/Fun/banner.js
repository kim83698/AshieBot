const Command = require('../../Structures/Command');
const figlet = require('util').promisify(require('figlet'));

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'banner',
			category: 'Fun',
			usage: '<text>'
		});
	}
	async run(message, args) {
		if(!args.length) return message.channel.send(`please input a piece of text`)
		return message.channel.send(await figlet(args.join(" ")), { code: true })
		.catch(async error => {
			await message.channel.send("Must be 2000 or fewer in length")
		})
	}

};
