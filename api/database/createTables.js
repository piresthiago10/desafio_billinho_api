const models = [
    require('../routers/students/ModelStudents'),
    // require('../routers/bills/ModelBills'),
    require('../routers/enrollments/ModelEnrollments')
]

async function createTables () {
    for (let tables = 0; tables < models.length; tables++){
        const model = models[tables]
        await model.sync()
    }
}

createTables()