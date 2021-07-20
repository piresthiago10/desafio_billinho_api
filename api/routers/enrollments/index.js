const router = require('express').Router({ mergeParams: true })
const TableEnrollments = require('./TableEnrollments')
const Enrollment = require('./Enrollment')
const { request, response } = require('express')
const Serializer = require('../../Serializer').EnrollmentSerializer

router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/', async (request, response) => {
    const enrollments = await TableEnrollments.listEnrollments(request.student.id)
    const serializer = new Serializer(
        response.getHeader('Content-Type')
    )
    response.send(
        serializer.serializer(enrollments)
    )
})

router.post('/', async (request, response, nextMiddleware) => {
    try {
        const idStudent = request.student.id
        const body = request.body
        const data = Object.assign({}, body, { student: idStudent })
        const enrollment = new Enrollment(data)
        await enrollment.create()
        const serializer = new Serializer(
            response.getHeader('Content-Type')
        )
        const timestamp = (new Date(enrollment.updatedAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.set('Location', `/api/students/${enrollment.student}/enrollment/${enrollment.id}`)
        response.status(201)
        response.send(
            serializer.serializer(enrollment)
        )
    } catch (error) {
        nextMiddleware(error)
    }
})

router.options('/:id', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'DELETE, GET, PUT')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.delete('/:id', async (request, response) => {
    const data = {
        id: request.params.id,
        student: request.student.id
    }

    const enrollment = new Enrollment(data)
    await enrollment.delete()
    response.status(204)
    response.end()
})

router.get('/:id', async (request, response, nextMiddleWare) => {
    try {
        const data = {
            id: request.params.id,
            student: request.student.id
        }

        const enrollment = new Enrollment(data)
        await enrollment.read()
        const serializer = new Serializer(
            response.getHeader('Content-Type'),
            ['student', 'createdAt', 'updatedAt']
        )
        const timestamp = (new Date(enrollment.updatedAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.send(
            serializer.serializer(enrollment)
        )
    } catch (error) {
        nextMiddleWare(error)
    }

})

router.put('/:id', async (request, response, nextMiddleWare) => {
    try {
        const data = Object.assign(
            {},
            request.body,
            {
                id: request.params.id,
                student: request.student.id
            }
        )
    
        const enrollment = new Enrollment(data)
        await enrollment.update()
        await enrollment.read()
        const timestamp = (new Date(enrollment.updatedAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(204)
        response.end()
    } catch (error) {
        nextMiddleWare(error)
    }
})


module.exports = router