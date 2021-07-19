const router = require('express').Router({ mergeParams: true })
const TableEnrollments = require('./TableEnrollments')
const Enrollment = require('./Enrollment')
const { request, response } = require('express')
const Serializer = require('../../Serializer').EnrollmentSerializer

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
        response.status(201)
        response.send(
            serializer.serializer(enrollment)
        )
    } catch (error) {
        nextMiddleware(error)
    }
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
        response.status(204)
        response.end()
    } catch (error) {
        nextMiddleWare(error)
    }
})


module.exports = router