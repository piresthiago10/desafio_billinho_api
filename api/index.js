const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())

const students = require('./routers/students')
app.use('/api/students', students)

const enrollments = require('./routers/enrollments')
app.use('/api/enrollments', enrollments)

const bills = require('./routers/bills')
app.use('/api/bills', bills)

app.listen(config.get('api.port'), () => console.log('Api está funcionando'))