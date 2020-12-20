this.client.channels.cache.get('ChannelID').createInvite().then(async function (invite) {
    return await message.channel.send(`https://discord.gg/${invite.code}`)
})