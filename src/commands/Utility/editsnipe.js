module.exports = {
    name: 'editsnipe',
    description: 'Mostrar el Mensaje antes de ser Editado.',
    aliases: ['ens'],
    categoria: 'Utilidad',
    usage: '<canal>',
    execute(message, client, args) {

        const Discord = require('discord.js')
        const channel = message.mentions.channels.first() || message.channel
        const editsnipe = client.editsnipe.get(channel.id)

        if (!editsnipe) return message.channel.send(new Discord.MessageEmbed().setDescription('No hay mensajes editados en este Canal.'))
            .then(m => m.delete({ timeout: 4000 }))

        const embed = new Discord.MessageEmbed()
            .setDescription(`Alguien a editado su Mensaje... ¿Sera Kira?... el autor era **${editsnipe.autor}**.`)
            .addField('Datos', `> Mensaje Antes: **${editsnipe.mensaje_viejo}**\n> Mensaje Nuevo: **${editsnipe.mensaje_nuevo}**\n> Autor: **${editsnipe.autor}**\n> Canal: **${editsnipe.canal}**`)
            .setColor('')
        message.channel.send(embed)
    }
}