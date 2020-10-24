module.exports = {
    name: 'help',
    description: 'Ayuda e Información de Light Yagami',
    aliases: ['ayuda'],
    categoria: 'General',
    async execute(message, client, args) {

        const Discord = require('discord.js')
        const SchemaPrefix = require('../../database/models/prefix')
        const PrePrefix = await SchemaPrefix.findOne({ Guild: message.guild.id }).exec()
        const Prefix = PrePrefix ? PrePrefix.Prefix : 'lg!'

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`!Hola ${message.member.displayName}! Mi nombre es Light Yagami, pero puedes llamarme como quieras. Yo soy un bot creado para entretenerte y ayudar a tu Server.\nPuedes ver toda la información de un comando con \`${Prefix}help <comando>\`\n\nTotal de Comandos: \`[${client.commands.size - 5}]\``)
                .addField('Comandos Generales', '`help` `say`')
                .addField('Comandos de Información', '`avatar` `snipe` `editsnipe` `server`')
                .addField('Comandos de Diversión', '`meme`')
                .addField('Comandos de Configuración', '`setprefix`')
                .setColor('RANDOM')
            return message.channel.send(embed)
        }
    }
}