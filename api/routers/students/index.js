const router = require('express').Router()
const TableStudents = require('./TableStudents')
const Student = require('./Student')
const StudentSerializer = require('../../Serializer').StudentSerializer

router.get('/', async (request, response) => {
    const results = await TableStudents.listStudents()
    response.status(200)
    const studentSerializer = new StudentSerializer(
        response.getHeader('Content-Type')
    )
    response.send(
        studentSerializer.serializer(results)
    )
})

router.get('/:idStudent', async (request, response, nextMiddleware) => {
    try {
        const id = request.params.idStudent
        const student = new Student({ id: id })
        await student.read()
        response.status(200)
        const studentSerializer = new StudentSerializer(
            response.getHeader('Content-Type'),
            ['createdAt', 'updatedAt']
        )
        response.send(
            studentSerializer.serializer(student)
        )
    } catch (error) {
        nextMiddleware(error)
    }
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