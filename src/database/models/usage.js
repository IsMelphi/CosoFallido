const { Schema, model } = require('mongoose')

const SchemaUsage = new Schema({
    Bot: { type: String },
    Numero: 0
})

module.exports = model('Usage', SchemaUsage)