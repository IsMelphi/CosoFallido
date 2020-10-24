const { Schema, model } = require('mongoose')

const SchemaAFK = new Schema({
    Guild: { type: String },
    User: [{
        name: { type: String },
        reason: { type: String },
        date: { type: Number }
    }]
})

module.exports = model('AFK', SchemaAFK)