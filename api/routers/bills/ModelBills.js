const Sequelize = require('sequelize')
const instance = require('../../database')

const columns = {
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'pending', 'paid'),
        allowNull: true
    },
    enrollment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../enrollments/ModelEnrollments'),
            key: 'id'
        }
    },
}

const options = {
    freezeTableName: true,
    tableName: 'bills',
    timestamp: true
}

module.exports = instance.define('bills', columns, options)