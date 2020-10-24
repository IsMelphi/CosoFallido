module.exports = {
    name: 'send',
    description: 'Mandar mensajes al Chat de Light Yagami',
    aliases: [],
    categoria: 'Chat',
    execute(message, client, args) {

        const Discord = require('discord.js')
        const { Tiempo_Chat } = require('../../utils/Utils')

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('¿Que mensajes enviaras?'))
            .then(m => m.delete({ timeout: 4000 }))

        if (['discord.gg', 'https://discord.gg/'].some(link => message.content.toLowerCase().includes(link))) {
            if (message.deletable) message.delete()
            return message.channel.send(new Discord.MessageEmbed().setDescription('Nou').setColor('RANDOM'))
        }

        if (['```', '`'].some(bug => message.content.toLowerCase().includes(bug))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('Nou').setColor('RANDOM'))
        }

        if (!client.chat.has(client.user.id)) client.chat.set(client.user.id, [])
        client.chat.get(client.user.id).push({
            autor: message.author.tag,
            mensaje: args.join(' '),
            hora: Tiempo_Chat()
        })

        if (message.deletable) message.delete()

        message.channel.send(new Discord.MessageEmbed().setDescription('Mensaje enviado').setColor('FA8859'))

    }
}