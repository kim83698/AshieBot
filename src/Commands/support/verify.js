const Command = require("../../Structures/Command");

const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");

const moment = require("moment")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'verify',
            category: 'support',
        });
    }

    async run(message, args) {
        const neededRoles = [
            "dm status",
            `age`,
            `pronouns`
        ].join(" ")
        if (message.channel.id != '787559784232517672') return message.channel.send("that cant be ran here :(");
        if (message.guild.id != '787390213919473664') return message.channel.send("that cant be ran here :(");
        const role = message.guild.roles.cache.find(role => role.id === '787567853997260802')
        if (!role) return message.channel.send(`The role the bot is trying to give doesnt exist, please ping my developer \`${config.developer}\` or any of the staff team \n(if you are a staff member from a bot list testing this bot, \ni sadly cannot do anything about the error, it does have appicable handling however)`)
        if (role) {
            const owner = '779733309184802836';
            const staff = '787554402399158273';
            const welcomePing = '789224846528741416';
            const msg = await message.channel.send("Verifying. . .")
            msg.edit(`${message.author.tag} has verified`).then(async function (msg) {
                return await msg.delete({ timeout: 20000 })
            })
            message.author.send(`Thankyou for verifying in ${message.guild.name}, ${message.author.tag}, \n if an error has occoured please note that you have not been verified`)
            message.member.roles.add(role).catch(async function (error) {
                await msg.channel.send(`<@${owner}>\n<@&${staff}>`)
                await msg.channel.send(`please note ${message.author.tag} you have not been verified because of said issue (\`${error}\`), please wait patiently for my developer or a staff member to asses the issue`)
            })
            console.log(message.author.tag, 'has verified in', message.guild.name)
            const channel = this.client.channels.cache.get('789611433632858112')
            channel.send(new MessageEmbed().addField(`New user verified:`, [`${message.author.tag}\n${message.author.id}`]).addField(`This user was made on`, [`${moment(message.author.createdTimestamp).format('LT')} ${moment(message.author.createdTimestamp).format('LL')} ${moment(message.author.createdTimestamp).fromNow()}`]).setColor("#FFC0CB").setThumbnail(message.author.avatarURL({ dynamic: true, size: 512 })))
            if (!channel) return
            const e = new MessageEmbed()
                .setColor("#FFC0CB")
                .setThumbnail(message.author.avatarURL({ dynamic: true, size: 512 }))
                .addField(`new user has joined ${message.guild.name}!!`, [
                    `please welcome ${message.author.tag} \n(ID: ${message.author.id})!!`,
                    `\u200b`,
                    `This user was made on \n${moment(message.author.createdTimestamp).format('LT')} ${moment(message.author.createdTimestamp).format('LL')} ${moment(message.author.createdTimestamp).fromNow()}`
                ])
                .addField(`welcome ${message.author.username}!!!`, [
                    `please make sure you get the needed roles \n\`${neededRoles}\`!!`
                ])
            const newUser = this.client.channels.cache.get('787560904408563722').send(`<@${message.author.id}> <@&${welcomePing}>`, e)
            if (!newUser) return;
            message.delete({ timeout: 20000 })
        }
    }
}