const TableEnrollments = require('./TableEnrollments')
const moment = require('moment')
moment.suppressDeprecationWarnings = true; 
const EmptyData = require('../../errors/EmptyData')
const InvalidValue = require('../../errors/InvalidValue')

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

    async read () {
        const enrollment = await TableEnrollments.readId(this.id, this.student)
        this.amount = enrollment.amount
        this.installments = enrollment.installments
        this.due_day = enrollment.due_day
        this.createdAt = enrollment.createdAt
        this.updatedAt = enrollment.updatedAt
    }

    update () {
        const dataToUpdate = {}

        if (typeof this.amount === 'number' && this.amount > 0) {
            dataToUpdate.amount = this.amount
        }

        if (typeof this.installments === 'number' && this.installments > 0) {
            dataToUpdate.installments = this.installments
        }

        if (moment(this.due_day, "DD").isValid() && this.due_day > 0) {
            dataToUpdate.due_day = this.due_day
        }

        if (Object.keys(dataToUpdate).length === 0) {
            throw new EmptyData()
        }

        return TableEnrollments.update(
            {
                id: this.id,
                student: this.student
            },
            dataToUpdate
        )
    }

    delete () {
        return TableEnrollments.delete(this.id, this.student)
    }

    validation () {
        if (typeof this.amount !== 'number' || this.amount <= 0){
            throw new InvalidValue('amount')
        }

        if (typeof this.installments !== 'number' || this.installments <= 0){
            throw new InvalidValue('installments')
        }

        if (moment(this.due_day, "DD").isValid() == false || this.due_day <= 0){
            throw new InvalidValue('due_day')
        }
    }
}

module.exports = Enrollment