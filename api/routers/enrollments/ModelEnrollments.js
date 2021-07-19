const Sequelize = require('sequelize')
const instance = require('../../database')

const columns = {
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    installments: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    due_day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    student: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../students/ModelStudents'),
            key: 'id'
        }
    }
}

const options = {
    freezeTableName: true,
    tableName: 'enrollments',
    timestamp: true
}

module.exports = instance.define('enrollments', columns, options)