class InvalidValue extends Error {
    constructor (value) {
        const message = `O valor da variável '${value}' está incorreto!`
        super(message)
        this.name = 'InvalidValue'
        this.idError = 1
    }
}

module.exports = InvalidValue