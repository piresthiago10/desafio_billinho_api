const Model = require('./ModelStudents')
const NotFound = require('../../errors/NotFound')

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
            throw new NotFound()
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
    },

    delete(id) {
        return Model.destroy({
            where: { id: id }
        })
    }
}