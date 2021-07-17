const CPF = require('cpf');
const moment = require('moment')
// Desativa erro de Deprecation Warnings do moment,
// pois o formato de data utilizado no brasil gera um Warning.
moment.suppressDeprecationWarnings = true; 

const TableStudents = require('./TableStudents')

class Student {
    constructor({ id, name, cpf, birthdate, payment_method, createdAt, updatedAt }) {
        this.id = id
        this.name = name
        this.cpf = cpf
        this.birthdate = birthdate
        this.payment_method = payment_method
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create () {
        this.validation()
        const result = await TableStudents.create({
            name: this.name,
            cpf: this.cpf,
            birthdate: this.birthdate,
            payment_method: this.payment_method
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    async read () {
        const readStudent = await TableStudents.readId(this.id)
        this.name = readStudent.name
        this.cpf = readStudent.cpf
        this.birthdate = readStudent.birthdate
        this.payment_method = readStudent.payment_method
        this.createdAt = readStudent.createdAt
        this.updatedAt = readStudent.updatedAt
    }

    async update () {
        await TableStudents.readId(this.id)
        const columns = ['name', 'cpf', 'birthdate', 'payment_method']
        const dataUpdate = {}

        columns.forEach((column) => {
            const value = this[column]

            if (typeof value === 'string' && value.length > 0) {
                dataUpdate[column] = value
            }
        })

        if (Object.keys(dataUpdate).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar!')
        }

        await TableStudents.update(this.id, dataUpdate)
    }

    delete() {
        return TableStudents.delete(this.id)
    }

    validation () {
        
        if (typeof this.name !== 'string' || this.name.length === 0) {
            throw new Error(` O campo '${this.name}' está inválido`)
        }

        if (typeof this.payment_method !== 'string' || this.payment_method.length === 0) {
            throw new Error(` O campo '${this.payment_method}' está inválido`)
        }

        if (CPF.isValid(this.cpf) === false || this.cpf.length === 0) {
            throw new Error(` O campo '${this.cpf}' está inválido`)
        }

        if (moment(this.birthdate, "DD/MM/YYYY").isValid() === false || this.birthdate.length === 0){
            throw new Error(` O campo '${this.birthdate}' está inválido`)
        }

    }
}

module.exports = Student