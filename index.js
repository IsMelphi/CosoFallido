const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('<body style="background-color: yellow"> <h1 style="color: #ddd"> </h1></body>'))
app.listen(4020, function (error) {
    if (error) return console.error(error)
})

require('dotenv').config()
const { Comandos_Usados, Usuario_AFK } = require('./src/utils/Utils')

// ------------------ \\

const Discord = require('discord.js')
const client = new Discord.Client()

/* Mongoose = Database
 
 - Conneción
 - Schemas

 ***********/

const connect = require('./src/database/main')
const SchemaPrefix = require('./src/database/models/prefix')
const SchemaUsage = require('./src/database/models/usage')

// ----------------------------------------------- \\

client.commands = new Discord.Collection()
client.chat = new Map()
client.snipe = new Map()
client.editsnipe = new Map()
client.usage = SchemaUsage

// -------------------- Handler ---------------------- \\

const ArchivosComandos = require('fs').readdirSync('./src/commands').filter(file => file.endsWith('.js'))

for (const Folder of require('./handler')()) {
    const FolderFile = require('fs').readdirSync(`./src/commands/${Folder}`)
    for (const File of FolderFile) {
        ArchivosComandos.push([Folder, File])
    }
}

for (const file of ArchivosComandos) {
    let cmd;
    if (Array.isArray(file)) cmd = require(`./src/commands/${file[0]}/${file[1]}`)
    else cmd = require(`./src/commands/${file}`)

    client.commands.set(cmd.name, cmd)
}


// --------------------- Eventos ----------------------- \\

client.on('ready', () => {

    connect
    console.log('Bot listo.')

})

client.on('messageDelete', (message) => {

    if (message.author.bot) return;
    
    client.snipe.set(message.channel.id, {
    
        mensaje: message.content,
        autor: message.author.tag,
        canal: message.channel.name
    
    })

})

client.on('messageUpdate', (oldMessage, newMessage) => {

    if (oldMessage.author.bot) return;
    if (newMessage.author.bot) return;

    client.editsnipe.set(newMessage.channel.id, {

        mensaje_nuevo: newMessage.content,
        mensaje_viejo: oldMessage.content,
        autor: newMessage.author.tag,
        canal: newMessage.channel.name

    })

})

client.on('guildDelete', async (guild) => {

    await SchemaPrefix.deleteOne({ Guild: guild.id })
    console.log(`Prefix eliminado de ${guild.name}`)
})

client.on('message', async (message) => {

    if (message.author.bot) return;

    await Usuario_AFK(message)

    const Prefix = await SchemaPrefix.findOne({ Guild: message.guild.id }).exec()
    const prefix = Prefix ? Prefix.Prefix : 'gr!'

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmdName = args.shift().toLowerCase()

    const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName))
    if (!command) return;

    await Comandos_Usados(client, message, command.name)

    try {    
        command.execute(message, client, args)
    } catch(error) {
        return console.error(error)
    }

})

client.login(process.env.DISCORD_TOKEN)