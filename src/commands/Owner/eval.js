module.exports = {
    name: 'eval',
    description: 'Evaluar codigos de JavaScript.',
    aliases: ['e'],
    categoria: 'Devs',
    async execute(message, client, args) {

        const Discord = require('discord.js')
        const Util = require('util')
        const devs = require('../../utils/devs.json').devs
        

        if (!devs.id.includes(message.author.id)) return;
        if (!args[0]) return;

        try {

            let output = await eval(args.join(' '))
            let type = typeof output;
            if (typeof output !== 'string') output = Util.inspect(output, { depth: 0})

            if (output.length >= 1020) output = `${output.substr(0, 1010)}...`;

            let embed2 = new Discord.MessageEmbed()
                .setAuthor('Evaluacion Correcta! ' + message.author.tag, message.author.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' }))
                .addField('Evaluado en', `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\n\`\`\``, true)
                .addField('Tipo', `\`\`\`prolog\n${type.substring(0, 1).toUpperCase() + type.substring(1)}\n\`\`\``, true)
                .addField('Entrada', `\`\`\`js\n${args.join(' ')}\n\`\`\``)
                .addField('Salida', `\`\`\`js\n${output.replace(process.env.DISCORD_TOKEN, 'ADONDE IBAS MASTER 😎')}\n\`\`\``)
                .setColor('RANDOM')
            message.channel.send(embed2)

        } catch (err) {

            let embed3 = new Discord.MessageEmbed()
                .setAuthor('Ups... Hubo un Error ' + message.author.tag, message.author.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' }))
                .addField('Tipo', `\`\`\`prolog\n${err.name}\n\`\`\``, true)
                .addField('Error', `\`\`\`js\n${err.message}\n\`\`\``, true)
                .setColor('RANDOM')
            message.channel.send(embed3)
        }
    }
}