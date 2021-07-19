const Model = require('./ModelEnrollments')

module.exports = {
    listEnrollments(idStudent) {
        return Model.findAll({
            where: {
                student: idStudent
            }
        })
    },
    create(data) {
        return Model.create(data)
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