const TableEnrollments = require('./TableEnrollments')

class Enrollment {
    constructor({ id, amount, installments, due_day, student, createdAt, updatedAt }) {
        this.id = id
        this.amount = amount
        this.installments = installments
        this.due_day = due_day
        this.student = student
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create () {
        this.validation()
        const result = await TableEnrollments.create({
            amount: this.amount,
            installments: this.installments,
            due_day: this.due_day,
            student: this.student
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    delete () {
        return TableEnrollments.delete(this.id, this.student)
    }

    validation () {
        if (typeof this.amount !== 'number' || this.amount <= 0){
            throw new Error('O campo amount está inválido')
        }

        if (typeof this.installments !== 'number' || this.installments <= 0){
            throw new Error('O campo installments está inválido')
        }

        if (typeof this.due_day !== 'number' || this.due_day <= 0){
            throw new Error('O campo due_day está inválido')
        }
    }
}

module.exports = Enrollment