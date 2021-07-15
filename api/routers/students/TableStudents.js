const Model = require('./ModelStudents')

module.exports = {
    listStudents () {
        return Model.findAll()
    }
}