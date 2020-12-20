const Command = require('../../Structures/Command');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'reload',
            aliases:["r"],
            category: 'Owner',
            ownerOnly: true
        });
    }

    /**
     * @param {Message} message
     * @param {string[]) args
     */
    async run(message, args) {
        const cmd = args[0];
        if (!cmd) {
            const noCMD = new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Please enter the command name for reload!`)
                .setTimestamp();
            return message.channel.send(noCMD);
        }

        const command = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd));

        if (command) {
            delete require.cache[require.resolve(`../${command.category}/${ucFirst(command.name)}.js`)];

            const File = require(`../${command.category}/${ucFirst(command.name)}.js`);
            const Command = new File(this.client, command.name);

            this.client.commands.delete(command.name);
            await this.client.commands.set(command.name, Command);

            const restartedCMD = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Command **${command.name}** has been reloaded!`)
                .setTimestamp();
            return message.channel.send(restartedCMD);
        } else {
            const notFound = new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Could not find command named **${cmd}**!`)
                .setTimestamp();
            return message.channel.send(notFound);
        }

        function ucFirst(str) {
            if (!str) return str;
            return str[0] + str.slice(1);
        }
    }
}