module.exports = {
    name: 'server',
    description: 'Información del Servidor',
    usage: '<server>',
    aliases: ['sv'],
    categoria: 'Utilidad',
    execute(message, client, args) {

        const Discord = require('discord.js')
        const { Flags, Features, Notificaciones, Verificacion } = require('../../utils/Flags')
        const traductor = require('@vitalets/google-translate-api')
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

        traductor(Intl.DateTimeFormat('es', opciones).format(message.guild.createdAt), {
            to: 'es'
        }).then(res => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Información de ${message.guild.name}`, message.guild.iconURL({ size: 2048, format: 'png', dynamic: true }))
                .addField('Creador', `**Tag:** ${message.guild.owner.user.username}\n**ID:** ${message.guild.owner.user.id}`)

            if (message.guild.premiumTier) embed.addField('\<a:NitroNitroso:753722285621248010>Boost Estadisticas', `**Numero de Boost:** ${message.guild.premiumSubscriptionCount} Miembros\n**Nivel de Boost:** ${message.guild.premiumTier}`)
            if (message.guild.features.length) embed.addField('Features', `\`\`\`\n${message.guild.features.map(x => Features[x]).join(', ')}\n\`\`\``)

                embed.addField('Servidor', `Notificaciones: **${Notificaciones[message.guild.defaultMessageNotifications]}**\nCreado el: **${res.text}**\nVerificación: **${Verificacion[message.guild.verificationLevel]}**\nRegión: **${Flags[message.guild.region]}**`, true)
                embed.addField('Estadisticas del Servidor', `Canales: **${message.guild.channels.cache.size}**\nMiembros: **${message.guild.memberCount}**\nEmojis: **${message.guild.emojis.cache.size}**\nRoles: **${message.guild.roles.cache.size}**`, true)
                
                embed.setImage(
                
                message.guild.bannerURL({ size: 2048, dynamic: true, format: 'png' }) 
                || message.guild.splashURL({ size: 2048, dynamic: true, format: 'png'}) 
                || message.guild.iconURL({size: 2048, dynamic: true, format: 'png'}))

                .setColor('RANDOM')
            message.channel.send(embed)
        })
    }
}