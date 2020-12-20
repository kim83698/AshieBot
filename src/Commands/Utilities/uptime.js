const Command = require(`../../Structures/Command.js`);
const moment = require('moment')
const ms = require('ms')

function convertMS(ms) {
	let d, h, m, s;
	s = Math.floor(ms / 1000);
	m = Math.floor(s / 60);
	s = s % 60;
	h = Math.floor(m / 60);
	m = m % 60;
	d = Math.floor(h / 24);
	h = h % 24;
	return {
		d: d
		, h: h
		, m: m
		, s: s
	};
};
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ut'],
			description: `Displays the uptime of the bot`,
			category: `Utilities`
		})
	}

	async run(message) {
		let u = convertMS(this.client.uptime);
		let uptime = u.d + " Day(s): " + u.h + " Hour(s): " + u.m + " Minute(s): " + u.s + " Second(s)"
		const duration = moment.duration(this.client.uptime)
		message.channel.send(`My uptime is \`${uptime}\``);
	}

};
