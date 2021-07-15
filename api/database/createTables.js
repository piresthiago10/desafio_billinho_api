const ModelStudents = require('../routers/students/ModelStudents')

ModelStudents
    .sync()
    .then(() => console.log('Tabela students criada com sucesso'))
    .catch(console.log)

const ModelBills = require('../routers/bills/ModelBills')

ModelBills
    .sync()
    .then(() => console.log('Tabela bills criada com sucesso'))
    .catch(console.log)

const ModelEnrollments = require('../routers/enrollments/ModelEnrollments')

ModelEnrollments
    .sync()
    .then(()=> console.log('Tabela enrollments criada com sucesso'))
    .catch(console.log)