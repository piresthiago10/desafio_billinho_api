const TypeNotAccepted = require('./errors/NotFound')

class Serializer {
    json(data) {
        return JSON.stringify(data)
    }

    serializer(data) {
        if (this.contentType === 'application/json') {
            return this.json(
                this.filter(data)
            )
        }

        throw new TypeNotAccepted(this.contentType)
    }

    filterObject(data) {
        const newObject = {}

        this.publicData.forEach((info) => {
            if (data.hasOwnProperty(info)) {
                newObject[info] = data[info]
            }
        })

        return newObject
    }

    filter (data) {
        if (Array.isArray(data)){
            // criar uma nova lista
            data = data.map(item => {
                return this.filterObject(item)
            })
        } else {
            data = this.filterObject(data)
        }

        return data
    }
}

class StudentSerializer extends Serializer {
    constructor(contentType, extraData) {
        super()
        this.contentType = contentType
        this.publicData = [
            'id'
        ].concat(extraData || [])
    }
}

class EnrollmentSerializer extends Serializer {
    constructor (contentType, extraData) {
        super()
        this.contentType = contentType
        this.publicData = [
            'id',
            'amount',
            'installments',
            'due_day',
            'bills',
        ].concat(extraData || [])
        this.tagSingular = 'enrollment'
        this.tagPlural = 'enrollments'
    }
}

class BillSerializer extends Serializer {
    constructor (contentType, extraData) {
        super()
        this.contentType = contentType
        this.publicData = [
            'id',
            'amount',
            'due_day',
            'status',
        ].concat(extraData || [])
        this.tagSingular = 'bill'
        this.tagPlural = 'bills'
    }
}

class ErrorSerializer extends Serializer {
    constructor (contentType, extraData) {
        super()
        this.contentType = contentType
        this.publicData = [
            'id',
            'mensagem'
        ].concat(extraData || [])
    }
}

module.exports = {
    Serializer: Serializer,
    StudentSerializer: StudentSerializer,
    ErrorSerializer: ErrorSerializer,
    EnrollmentSerializer: EnrollmentSerializer,
    BillSerializer: BillSerializer,
    acceptedFormats: ['application/json']
}