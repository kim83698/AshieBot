const Command = require("../../Structures/Command");

const { MessageEmbed } = require("discord.js")

const moment = require("moment")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'inspect',
            category: 'Owner',
            ownerOnly: true
        });
    }

    async run(message, args) {
        //if (args.length < 1) return message.channel.send(`Please include an ID`)
        const guild = this.client.guilds.cache.get(args[0]) || message.guild;
        guild.channels.cache.random().createInvite().then(async invite => {
            const e = new MessageEmbed()
                .setTitle(`${guild.name}`)
                .setColor("RANDOM")
                .setFooter(`Remember kids, getting an guild invite without owners consent is against TOS's!`)
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addField(`Member Count`, [
                    `Total: ${guild.memberCount}`,
                    `Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`,
                    `Bots: ${guild.members.cache.filter(member => member.user.bot).size}`
                ])
                .addField(`Created:`, [
                    `${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} ${moment(guild.createdTimestamp).fromNow()}`
                ])
                .addField(`Owner:`, [
                    `ID: ${guild.owner.user.id}`,
                    `Name: ${guild.owner.user.tag}`
                ])
                .addField(`Invite:`, [
                    `click [here](https://discord.gg/${invite.code})`
                ])
            message.channel.send(e)
                .catch(async error => {
                    await messsage.channel.send(`${error.message}`)
                })
        })
    }
}