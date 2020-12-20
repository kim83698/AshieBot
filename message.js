const { MessageEmbed } = require('discord.js');
const e = new MessageEmbed()
    .setThumbnail(msg.guild.iconURL({ size: 512 }))
    .setColor("RANDOM")
    .addField(`${message.guild.name}'s description`, [
        `╭:Cxtton Clouds~!𝟵
    ๑‧˚₊꒷꒦︶︶︶
    — [♡] What we offer
    - Anime section 
    - Sfw environment
    - Aesthetic layout
    - Strict rules
    - Alters for those with D.I.D 
    - And more
    ๑‧˚₊꒷꒦︶︶︶
    — [♡] Basic rules
    - No nsfw, talk, posting it etc
    - Account must be 1 week old
    - No spamming
    - No coping the layout the owner work EVERY hard on this 
    - Must verify before getting in`,
        `[invite](https://discord.gg/DH4qngg2T4)`
    ])
message.channel.send(e)