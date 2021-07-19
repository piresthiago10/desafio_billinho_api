class EmptyData extends Error{
    constructor () {
        super('Não foram fornecidos dados para atualizar!')
        this.name = 'EmptyData'
        this.idError = 2
    }
}

module.exports = EmptyData