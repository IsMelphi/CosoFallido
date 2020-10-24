const { Schema, model } = require('mongoose')

const SchemaPrefix = new Schema({
    Guild: { type: String },
    Prefix: { type: String }
})

module.exports = model('Prefix', SchemaPrefix)