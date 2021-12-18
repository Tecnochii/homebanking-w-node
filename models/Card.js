const Sequelize = require('sequelize')
const sequelize = require('../database/config')

const Card = sequelize.define('Cards', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cardholder: {
        type: Sequelize.CHAR
    },
    color: {
        type: Sequelize.ENUM("SILVER", "GOLD", "TITANIUM")
    },
    cvv: {
        type: Sequelize.INTEGER
    },
    from_date: {
        type: Sequelize.DATE
    },
    number: {
        type: Sequelize.CHAR
    },
    thru_date: {
        type: Sequelize.DATE
    },
    type: {
        type: Sequelize.ENUM("Debito", "Credito")
    },
    client_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'card'
})

module.exports = Card