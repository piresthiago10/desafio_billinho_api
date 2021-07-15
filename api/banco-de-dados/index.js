const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    config.get("postgres.dataBase"),
    config.get("postgres.userName"),
    config.get("postgres.password"),
    {
        host: config.get('postgres.host'),
        dialect: 'postgres'
    }
)

module.exports = instancia