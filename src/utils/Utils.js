module.exports = {

    /* ----------Funciones para evitar mucho code-------------
      
      - Tiempo_Chat = El tiempo para el comando chat | [Hora:Minuto]
      - Tiempo = El tiempo para el comando AFK | [Dia | Numero del dia | Mes | Año]
      - User_Afk = Ver si el usuario esta AFK o si habla o lo mencionan.
      - Command_Usage = Numero de Comandos Usados.
     
     ---------------------------------------------- */

    Tiempo_Chat: function Tiempo_Chat() {

        Tiempo = new Date()
        Hora = Tiempo.getHours()
        Minuto = Tiempo.getMinutes()

        if (Hora < 10) Hora = `0${Hora}`
        if (Minuto < 10) Minuto = `0${Minuto}`

        return `${Hora}:${Minuto}`
    },

    Usuario_AFK: async function Usuario_AFK(message) {

        const SchemaUsersAfk = require('../database/models/afk')
        const AFK = await SchemaUsersAfk.findOne({ Guild: message.guild.id })
        let Usuarios = AFK ? AFK.User : [];
        let Usuario_AFK = Usuarios.find(u => u.name === message.author.id)

        async function Tiempo(date) { 
            const opciones = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }

            let salida = new Intl.DateTimeFormat('es', opciones).format(date);
            return require('@vitalets/google-translate-api')(salida, { to: 'es' }).then(res => res.text)
        }

        if (Usuario_AFK) {
            await AFK.updateOne({ $pull: { User: { name: message.author.id } }})
            return message.channel.send(`Volviste de tu aventura ${message.author.toString()}.`)
        }

        let Mencion = message.mentions.users.array()
        let Usuario_AFK_Mencionado = []

        for (User of Mencion) {
            if (Usuarios.find(u => u.name === User.id)) Usuario_AFK_Mencionado.push([User, Usuarios.find(u => u.name === User.id)])
        }
        
        if (Usuario_AFK_Mencionado[0]) {
            let Tiempesito = await Tiempo(Usuario_AFK_Mencionado[0].map(e => e.date)[1])
            message.channel.send(`${Usuario_AFK_Mencionado.map((d) => `${d[0].tag}, esta AFK ${d[1].reason}, el ${Tiempesito}`)}`)
        }

        return 'Funciones la solución para ahorrar code XDD'

    },

    Comandos_Usados: async function Comandos_Usados(client, message, command) {

        const SchemaUsage = require('../database/models/usage')
        const Usage = await SchemaUsage.findOne({ Bot: client.user.id }).exec()
        
        if (Usage) { let numero = Usage.Numero; await SchemaUsage.updateOne({ Bot: client.user.id, Numero: numero + 1 })

        } else { await new SchemaUsage({ Bot: client.user.id, Numero: +1 }).save() }

        return console.log(`${message.author.tag} uso el comando ${command}`)
    }
}