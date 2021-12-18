const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'Homebanking',
    'postgres',
    'admin',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        }
    }

)

