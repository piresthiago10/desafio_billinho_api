const router = require('express').Router()
const TableStudents = require('./TableStudents')

router.use('/', async (request, response) => {
    const result = await TableStudents.listStudents()
    response.send(JSON.stringify(result))
 })

module.exports = router