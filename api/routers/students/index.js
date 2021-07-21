const router = require('express').Router()
const TableStudents = require('./TableStudents')
const Student = require('./Student')
const StudentSerializer = require('../../Serializer').StudentSerializer

// Lista os metódos http permitidos pela api
router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/', async (request, response) => {
    const results = await TableStudents.listStudents()
    response.status(200)
    const studentSerializer = new StudentSerializer(
        response.getHeader('Content-Type'),
        ['name',
        'cpf',
        'birthdate',
        'payment_method',
        'createdAt',
        'updatedAt']
    )
    response.send(
        studentSerializer.serializer(results)
    )
})

router.post('/', async (request, response, nextMiddleware) => {
    try {
        const receivedData = request.body
        const student = new Student(receivedData)
        await student.create()
        response.status(201)
        const studentSerializer = new StudentSerializer(
            response.getHeader('Content-Type')
        )
        response.send(
            studentSerializer.serializer(student)
        )
    } catch (error) {
        nextMiddleware(error)
    }

})

router.options('/:idStudent', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/:idStudent', async (request, response, nextMiddleware) => {
    try {
        const id = request.params.idStudent
        const student = new Student({ id: id })
        await student.read()
        response.status(200)
        const studentSerializer = new StudentSerializer(
            response.getHeader('Content-Type'),
            ['name',
            'cpf',
            'birthdate',
            'payment_method',
            'createdAt',
            'updatedAt']
        )
        response.send(
            studentSerializer.serializer(student)
        )
    } catch (error) {
        nextMiddleware(error)
    }
})

router.put('/:idStudent', async (request, response, nextMiddleware) => {
    try {
        const id = request.params.idStudent
        const receivedData = request.body
        const data = Object.assign({}, receivedData, { id: id })
        const student = new Student(data)
        await student.update()
        response.status(204)
        response.end()
    } catch (error) {
        nextMiddleware(error)
    }
})

router.delete('/:idStudent', async (request, response, nextMiddleware) => {
    try {
        const id = request.params.idStudent
        const student = new Student({ id: id })
        await student.read()
        await student.delete()
        response.status(204)
        response.end()
    } catch (error) {
        nextMiddleware(error)
    }
})

const routerEnrollments = require('../enrollments')
const { request, response } = require('express')

const verifyStudent = async (request, response, nextMiddleware) => {
    try{
        const idStudent = request.params.idStudent
        const student = new Student({id: idStudent})
        await student.read()
        request.student = student
        nextMiddleware()
    } catch (error) {
        nextMiddleware(error)
    }
}

router.use('/:idStudent/enrollment', verifyStudent, routerEnrollments)

module.exports = router