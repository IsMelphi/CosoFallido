module.exports = {
    name: 'avatar',
    description: 'Muestra el avatar de un Usuario',
    aliases: ['pfp'],
    usage: '<usuario>',
    categoria: 'Utilidad',
    execute(message, client, args) {

        const Discord = require('discord.js')

        const user = client.users.cache.find(e => e.username === args.join(' ')) || client.users.resolve(args[0]) || message.mentions.users.first() || message.author

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Avatar de ${user.tag}`)
            .setDescription(`[Avatar Link](${user.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' })})`)
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' }))
            .setColor('RANDOM')
        message.channel.send(embed)
    }
}