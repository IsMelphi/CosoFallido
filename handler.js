module.exports = function getDirectorios() {
    return require('fs').readdirSync('./src/commands').filter(function subFolder(file) {
        return require('fs').statSync(`./src/commands/${file}`).isDirectory()
    })
}