const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')
const InvalidValue = require('./errors/InvalidValue')
const EmptyData = require('./errors/EmptyData')
const TypeNotAccepted = require('./errors/TypeNotAccepted')
const acceptedFormats = require('./Serializer').acceptedFormats

app.use(bodyParser.json())

app.use((request, response, nextMiddleware) => {
    let typeOfFormat = request.header('Accept')

    if (typeOfFormat === '*/*')
    typeOfFormat = 'application/json'

    if (acceptedFormats.indexOf(typeOfFormat) === -1) {
        response.status(406)
        response.end()
        return
    }

    response.setHeader('Content-type', typeOfFormat)
    nextMiddleware()
})

const students = require('./routers/students')
app.use('/api/students', students)

const enrollments = require('./routers/enrollments')
app.use('/api/enrollments', enrollments)

const bills = require('./routers/bills')
const { request, response } = require('express')
app.use('/api/bills', bills)

app.use((error, request, response, nextMiddleware) => {
    let status = 500

    if (error instanceof NotFound) {
        status = 404
    } 

    if (error instanceof InvalidValue || error instanceof EmptyData) {
        status = 400
    }

    if (error instanceof TypeNotAccepted) {
        status = 406
    }

    response.status(status)

    response.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idError
        })
    )
})
app.listen(config.get('api.port'), () => console.log('Api está funcionando'))