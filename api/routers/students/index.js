const router = require('express').Router()
const TableStudents = require('./TableStudents')
const Student = require('./Student')
const { request, response } = require('express')
const NotFound = require('../../errors/NotFound')

router.get('/', async (request, response) => {
    const result = await TableStudents.listStudents()
    response.status(200)
    response.send(JSON.stringify(result))
})

router.get('/:idStudent', async (request, response) => {
    try {
        const id = request.params.idStudent
        const student = new Student({ id: id })
        await student.read()
        response.status(200)
        response.send(
            JSON.stringify(student)
        )
    } catch (error) {
        response.status(404)
        response.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

router.post('/', async (request, response) => {
    try {
        const receivedData = request.body
        const student = new Student(receivedData)
        await student.create()
        response.status(201)
        response.send(
            JSON.stringify(student)
        )
    } catch (error) {
        response.status(400)
        response.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
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

router.delete('/:idStudent', async (request, response) => {
    try {
        const id = request.params.idStudent
        const student = new Student({ id: id })
        await student.read()
        await student.delete()
        response.status(204)
        response.end()
    } catch (error) {
        response.status(404)
        response.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

module.exports = router