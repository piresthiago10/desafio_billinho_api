const { readId } = require('../students/TableStudents')
const Model = require('./ModelBills')
const NotFound = require('../../errors/NotFound')
const dataBase = require('../../database')

module.exports = {
    listBills(idEnrollment) {
        return Model.findAll({
            where: {
                enrollment: idEnrollment
            },
            raw: true
        })
    },

    create(data) {
        return Model.create(data)
    },

    async readId(idBill, idEnrollment) {
        const read = await Model.findOne({
            where: {
                id: idBill,
                student: idEnrollment
            },
            // retorna como objeto puro do javascript
            raw: true
        })

        if (!read) {
            throw new NotFound('Mensalidade')
        }

        return read
    },

    update (billData, billToUpdate) {
        return Model.update(
            billToUpdate,
            {
                where: billData
            }
        )
    },

    delete(idBill, idEnrollment) {
        return Model.destroy({
            where: {
                id: idBill,
                enrollment: idEnrollment
            }
        })
    },

    updateStatus (idBill, idEnrollment, status) {
        return dataBase.transaction(async transaction => {
            const bill = await Model.findOne({
                where: {
                    id: idBill,
                    enrollment: idEnrollment
                }
            })

            bill['status'] = status

            await bill.save()

            return bill
        })
    }
}