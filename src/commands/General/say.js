module.exports = {
    name: 'say',
    description: 'Repitir tu Texto',
    aliases: ['decir'],
    categoria: 'General',
    execute(message, client, args) {

        if (!args[0]) {
            return message.channel.send('Debes escribir un mensaje.')
                .then(m => m.delete({ timeout: 4000 }))
        }

        if (message.deletable) message.delete()

        message.channel.send(args.join(' '), {
            disableMentions: 'all'
        })
    }
}