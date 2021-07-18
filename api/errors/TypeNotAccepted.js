class TypeNotAccepted extends Error {
    constructor (contentType) {
        super(`O tipo de conteúdo ${contentType} não é suportado!`)
        this.name = 'TypeNotAccepted'
        this.idError = 3
    }
}

module.exports = TypeNotAccepted