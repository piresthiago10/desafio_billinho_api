const router = require('express').Router({ mergeParams: true })
const TableEnrollments = require('./TableEnrollments')
const Enrollment = require('./Enrollment')
const { request, response } = require('express')

router.get('/', async (request, response) => {
    const enrollments = await TableEnrollments.listEnrollments(request.student.id)
    response.send(
        JSON.stringify(enrollments)
    )
})

router.post('/', async (request, response, nextMiddleware) => {
    try {
        const idStudent = request.student.id
        const body = request.body
        const data = Object.assign({}, body, { student: idStudent})
        const enrollment = new Enrollment(data)
        await enrollment.create()
        response.status(201)
        response.send(enrollment)
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

module.exports = router