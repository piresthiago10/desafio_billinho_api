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
    discount: {
        type: Sequelize.ENUM('5', '25', '50', '75'),
        allowNull: true
    },
}

const options = {
    freezeTableName: true,
    tableName: 'enrollments',
    timestamp: true
}

module.exports = instance.define('enrollments', columns, options)