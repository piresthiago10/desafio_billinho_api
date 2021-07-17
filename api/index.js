const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')

app.use(bodyParser.json())

const students = require('./routers/students')
app.use('/api/students', students)

const enrollments = require('./routers/enrollments')
app.use('/api/enrollments', enrollments)

const bills = require('./routers/bills')
app.use('/api/bills', bills)

app.use((error, request, response, nextMiddleware) => {
    if (error instanceof NotFound) {
        response.status(404)
    } else {
        response.status(400)
    }
    response.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idError
        })
    )
})
app.listen(config.get('api.port'), () => console.log('Api está funcionando'))