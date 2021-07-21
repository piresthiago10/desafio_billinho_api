const TableBills = require('./TableBills')
const moment = require('moment')
moment.suppressDeprecationWarnings = true; 
const EmptyData = require('../../errors/EmptyData')
const InvalidValue = require('../../errors/InvalidValue')

class Bill {
    constructor({ id, amount, due_date, status, enrollment, createdAt, updatedAt }) {
        this.id = id
        this.amount = amount
        this.due_date = due_date
        this.status = status
        this.enrollment = enrollment
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create () {
        this.validation()
        const result = await TableBills.create({
            amount: this.amount,
            due_date: this.due_date,
            status: this.status,
            enrollment: this.enrollment
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    async read () {
        const bill = await TableBills.readId(this.id, this.enrollment)
        this.amount = bill.amount
        this.due_date = bill.due_date
        this.status = bill.status
        this.createdAt = bill.createdAt
        this.updatedAt = bill.updatedAt
    }

    update () {
        const dataToUpdate = {}

        if (typeof this.amount === 'number' && this.amount > 0) {
            dataToUpdate.amount = this.amount
        }

        if (moment(this.due_date, "DD/MM/YYYY").isValid() && this.due_date.length === 0) {
            dataToUpdate.due_day = this.due_day
        }

        if (typeof this.status === 'string' && this.installments.length === 0) {
            dataToUpdate.installments = this.installments
        }

        if (Object.keys(dataToUpdate).length === 0) {
            throw new EmptyData()
        }

        return TableBills.update(
            {
                id: this.id,
                enrollment: this.enrollment
            },
            dataToUpdate
        )
    }

    updateStatus () {
        return TableBills.updateStatus(
            this.id,
            this.enrollment,
            this.status
        )
    }

    delete () {
        return TableBills.delete(this.id, this.enrollment)
    }

    validation () {
        if (typeof this.amount !== 'number' || this.amount <= 0){
            throw new InvalidValue('amount')
        }

        if (typeof this.status !== 'string' || this.status.length === 0){
            throw new InvalidValue('status')
        }

        if (moment(this.due_date, "DD/MM/YYYY").isValid() == false || this.date.length === 0){
            throw new InvalidValue('due_date')
        }
    }
}

module.exports = Bill