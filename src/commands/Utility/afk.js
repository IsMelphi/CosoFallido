module.exports = {
    name: 'afk',
    description: 'Colocarse en estado AFK',
    aliases: [],
    usage: '<razón>',
    categoria: 'Utilidad',
    async execute(message, client, args) {  

        let SchemaAFK = require('../../database/models/afk')
        let Guild = await SchemaAFK.findOne({ Guild: message.guild.id })
        let Nueva_Guild = new SchemaAFK({ Guild: message.guild.id })

        if(!Guild) {
            await Nueva_Guild.save()
            Guild = await SchemaAFK.findOne({ Guild: message.guild.id })
        }

        let razon = args.join(' ') || 'sin razón alguna'

        await Guild.updateOne({ $push: { User: { name: message.author.id, reason: razon, date: Date.now() } } })

        message.channel.send('Ahora estas en modo AFK')

    }
}