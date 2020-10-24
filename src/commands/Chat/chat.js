module.exports = {
    name: 'chat',
    description: 'Chat de Light Yagami',
    aliases: [],
    categoria: 'Chat',
    execute(message, client, args) {

        const Discord = require('discord.js')
        const chat = client.chat.get(client.user.id)
        const user_random = message.guild.members.cache.random()

        if (!chat) return message.channel.send(new Discord.MessageEmbed().setDescription('No hay mensajes en este Servidor.'))
            .then(m => m.delete({ timeout: 4000 }))

        if (client.chat.get(client.user.id).map(mensaje => mensaje.mensaje).join(' ').length > 2000) {
            client.chat.delete(client.user.id)
            return message.channel.send(new Discord.MessageEmbed().setDescription('Hubo una limpieza en el Chat.'))
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor('Light Chat', client.user.displayAvatarURL({ size: 2048, format: 'png', dynamic: true }))
            .setDescription(`\`\`\`ini\n${chat.map(x => `[${x.hora}][${x.autor}] ${x.mensaje}`).reverse().slice(0, 10).join('\n')}\n\`\`\``)
            .setFooter(`${user_random.displayName} Is Typing.`, user_random.user.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' }))
            .setColor('FFD788')
        message.channel.send(embed)

    }
}