module.exports = {
    name: 'snipe',
    description: 'Muestra el ultimo mensaje eliminado.',
    usage: '<canal>',
    aliases: [],
    categoria: 'Utilidad',
    execute(message, client, args) {

        const Discord = require('discord.js')
        const Channel = message.mentions.channels.first() || message.channel
        const Snipe = client.snipe.get(Channel.id)
        if (!Snipe) return message.channel.send(new Discord.MessageEmbed().setDescription('No hay mensajes eliminados en este canal.'))
            .then(m => m.delete({ timeout: 4000 }))

        try {

            const embed = new Discord.MessageEmbed()
                .setDescription(`> Hmm... Una persona llamada **${Snipe.autor}**, elimino un mensaje en **${Snipe.canal}**.\n\n**Más Información** `)
                .addField('Autor', Snipe.autor, true)
                .addField('Mensaje', Snipe.mensaje, true)
                .addField('Canal', Channel.toString(), true)
                .setColor('EA6959')
                .setFooter('Seguimos Investigando sus mensajes en busqueda de Kira.')
            message.channel.send(embed)

        } catch (err) {
            return message.channel.send('Ocurrio un problema...')
        }
    }
}