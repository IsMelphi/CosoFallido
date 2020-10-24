module.exports = {
    name: 'meme',
    description: 'Memes Random',
    aliases: [],
    categoria: 'Diversión',
    async execute(message, client, args) {

    const melphiworker = require('melphiworker')
    const meme = await melphiworker.memes()
    message.channel.send({files: [ meme ]})

    }
}