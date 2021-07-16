const router = require('express').Router()
const TableStudents = require('./TableStudents')
const Student = require('./Student')
const { request, response } = require('express')

router.get('/', async (request, response) => {
    const result = await TableStudents.listStudents()
    response.send(JSON.stringify(result))
})

router.get('/:idStudent', async (request, response) => {
    try {
        const id = request.params.idStudent
        const student = new Student({ id: id })
        await student.read()
        response.send(
            JSON.stringify(student)
        )
    } catch (error) {
        response.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

router.post('/', async (request, response) => {
    const receivedData = request.body
    const student = new Student(receivedData)
    await student.create()
    response.send(
        JSON.stringify(student)
    )
})

router.put('/:idStudent', async (request, response) => {
    try {
        const id = request.params.idStudent
        const receivedData = request.body
        const data = Object.assign({}, receivedData, { id: id })
        const student = new Student(data)
        await student.update()
        response.end()
    } catch (error) {
        response.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

module.exports = router