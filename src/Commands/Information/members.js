const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'members',
			category: 'Information'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		let guild = this.client.guilds.cache.get(args[0]) || message.guild;
		const e = new MessageEmbed()
			.setTitle(`user count for ${guild.name}`)
			.setColor('RANDOM')
			.setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
			.setFooter(`tip: use a guild id to see that guilds member count`)
			.addField(`Total:`, [
				`${guild.memberCount.toLocaleString()}`
			])
			.addField(`Humans:`, [
				`${guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`
			])
			.addField(`Bots:`, [
				`${guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`
			])
		message.channel.send(e)
	}
}