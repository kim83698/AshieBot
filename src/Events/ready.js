const Event = require('../Structures/Event');
const Discord = require("discord.js")
const prefixes = require("../../prefixes.json")
const config = require("../../config.json")
const { MessageEmbed, WebhookClient } = require("discord.js")
const moment = require("moment")
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true,
		});
	}
	//744705539014918145
	run(message) {

		const amount = Object.keys(prefixes).length
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size.toLocaleString()} commands!`,
			`Loaded ${this.client.events.size.toLocaleString()} events!`,
			`Loaded ${this.client.shard.count} shards`,
			`Loaded ${amount} prefixes`,
			`${this.client.users.cache.size.toLocaleString()} users, ${this.client.channels.cache.size.toLocaleString()} channels, ${this.client.guilds.cache.size.toLocaleString()} guilds.`,
			console.log(this.client.guilds.cache.map(c => c.name + "| " + c.id + "| " + c.ownerID)
			)].join('\n'));


		const activities = [
			`${this.client.users.cache.size.toLocaleString()} users!`,
			`${this.client.guilds.cache.size.toLocaleString()} servers!`,
			`${this.client.channels.cache.size.toLocaleString()} channels!`,
			`${this.client.shard.count.toLocaleString()} shards!`,
		];

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${this.client.prefix}help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);

		this.client.readyHook = new WebhookClient("787727965307797554", "Vs-j1rPvHuRSDnqkGJ2jA_1XkuVJe37mxMdeCNkA5nEb3yZqK87SjZRYV5BQM8DMSYFt")
		const e = new MessageEmbed()
			.setThumbnail(this.client.user.avatarURL({ size: 512 }))
			.setColor('RANDOM')
			.addField(`Logged in as ${this.client.user.tag}`, [
				`Loaded ${this.client.commands.size.toLocaleString()} commands!`,
				`Loaded ${this.client.events.size.toLocaleString()} events!`,
				`Loaded ${this.client.shard.count} shards`,
			].join("\n"))
			.addField(`${this.client.user.username} currently has`, [
				`${(this.client.owners.length)} registered staff`,
			])

			.addField(`${this.client.user.username}, currently has`, [
				`${amount} registered prefixes`
			])
			.addField(`${this.client.user.username}\'s Stats`, [
				`${this.client.users.cache.size.toLocaleString()} users!`,
				`${this.client.guilds.cache.size.toLocaleString()} servers!`,
				`${this.client.channels.cache.size.toLocaleString()} channels!`,
				`${this.client.shard.count.toLocaleString()} shards!`
			])
		this.client.readyHook.send(e)
	

		this.client.guild1 = new WebhookClient("787727965307797554", "Vs-j1rPvHuRSDnqkGJ2jA_1XkuVJe37mxMdeCNkA5nEb3yZqK87SjZRYV5BQM8DMSYFt")
		this.client.on("guildCreate", (guild) => {
			console.log(`New guild joined: \n${guild.name} \n(id: ${guild.id}). \nThis guild has \n${guild.memberCount} members!\nOwner:\n ${guild.owner.user.tag}\n${guild.owner.user.id}`)
			const f = new Discord.MessageEmbed()
				.setDescription(`New guild joined: \n${guild.name} \n(id: ${guild.id}). \nThis guild has \n${guild.memberCount} members!\nOwner:\n ${guild.owner.user.tag}\n${guild.owner.user.id}`)
			this.client.guild1.send(f);
		})

		this.client.guild2 = new WebhookClient("787727965307797554", "Vs-j1rPvHuRSDnqkGJ2jA_1XkuVJe37mxMdeCNkA5nEb3yZqK87SjZRYV5BQM8DMSYFt")

		this.client.on("guildDelete", (guild) => {
			console.log(`I have been removed from: \n${guild.name} \n(id: ${guild.id}) \nThis guild had \n${guild.memberCount} members!`)

			const a = new Discord.MessageEmbed()
				.setDescription(`I have been removed from: \n${guild.name} \n(id: ${guild.id}) \nThis guild had \n${guild.memberCount} members!`)
			this.client.guild2.send(a);
		});

	}
}