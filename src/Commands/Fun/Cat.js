const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const subreddits = [
	'cat',
	'cats',
	'catpics',
	'kittens'
];

module.exports = class extends Command {

	constructor(...args) {
        super(...args, {
            name: 'cat',
            category: 'Fun'
        });
	}
	
	async run(message) {
		const msg = await message.channel.send('Fetching Data...')

		const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
			.then(function (response) {
					return response.json();
				})
			.then(function (body) {
					return body.data;
				});
		const selected = data[Math.floor(Math.random() * data.length)];
		return msg.edit(new MessageEmbed().setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`));
	}

};
