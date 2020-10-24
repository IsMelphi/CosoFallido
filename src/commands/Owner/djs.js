module.exports = {
    name: 'djs',
    aliases: ['docs'],
    description: 'Discord.js Docs',
    categoria: 'Devs',
    async execute(message, client, args) {

        const Discord = require('discord.js')
        const fetch = require('node-fetch')

        if (!args[0]) return;

        fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`)
            .then(r => r.json())
            .then(res => {
                message.channel.send(new Discord.MessageEmbed(res))
            }).catch(err => message.channel.send(new Discord.MessageEmbed().setDescription(err).setColor('RANDOM')))
    }
}