const { readId } = require('../students/TableStudents')
const Model = require('./ModelEnrollments')
const NotFound = require('../../errors/NotFound')

module.exports = {
    listEnrollments(idStudent) {
        return Model.findAll({
            where: {
                student: idStudent
            },
            raw: true
        })
    },

    create(data) {
        return Model.create(data)
    },

    async readId(idEnrollment, idStudent) {
        const read = await Model.findOne({
            where: {
                id: idEnrollment,
                student: idStudent
            },
            // retorna como objeto puro do javascript
            raw: true
        })

        if (!read) {
            throw new NotFound('Matrícula')
        }

        return read
    },

    update (enrollmentData, dataToUpdate) {
        return Model.update(
            dataToUpdate,
            {
                where: enrollmentData
            }
        )
    },

    delete(idEnrollment, idStudent) {
        return Model.destroy({
            where: {
                id: idEnrollment,
                student: idStudent
            }
        })
    }
}