const Sequelize = require('sequelize')
const instance = require('../../database')

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    payment_method: {
        type: Sequelize.ENUM('credit_card', 'boleto'),
        allowNull: true
    },
}

const options = {
    freezeTableName: true,
    tableName: 'students',
    timestamp: true
}

module.exports = instance.define('students', columns, options)