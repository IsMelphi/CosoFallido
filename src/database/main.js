const { connect } = require('mongoose')

module.exports = connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function(error) {
    if(error) return console.errror(error)
    console.log('Conectado a MongoDB')
})