const Model = require('./ModelStudents')

module.exports = {
    listStudents() {
        return Model.findAll()
    },

    create(student) {
        return Model.create(student)
    },

    async readId(id) {
        const read = await Model.findOne({
            where: {
                id: id
            }
        })

        if (!read) {
            throw new Error('Estudante não encontrado')
        }

        return read
    },

    update(id, dataUpdate) {
        return Model.update(
            dataUpdate,
            {
                where: { id: id }
            }
        )
    }
}