const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    config.get("postgres.database"),
    config.get("postgres.username"),
    config.get("postgres.password"),
    {
        host: config.get('postgres.host'),
        dialect: 'postgres'
    }
)

module.exports = instancia