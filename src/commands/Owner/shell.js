module.exports = {
    name: 'shell',
    description: 'Usar el shell en el Bot',
    aliases: [],
    categoria: 'Devs',
    execute(message, client, args) {

        const Discord = require('discord.js')
        const { exec } = require('child_process')
        const { devs } = require('../../utils/devs.json')

        if (!devs.id.includes(message.author.id)) return;
        if (!args[0]) return;

        exec(args.join(' '), (err, stdout, stderr) => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 2048, dynamic: true, format: 'png'}))
                .addField('Evaluado en', `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``, true)
                .addField('Advertencias', `\`\`\`fix\n${err ? err : 'Sin Problemas'}\`\`\``, true)
                .addField('Entrada', `\`\`\`bat\n${args.join(' ')}\`\`\``)
                .addField('Salida', `\`\`\`\n${stderr}\n\n${stdout}\`\`\``)
                .setColor('RANDOM')
            message.channel.send(embed)
        })
    }
}