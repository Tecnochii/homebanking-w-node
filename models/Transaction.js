const Sequelize = require('sequelize')
const sequelize = require('../database/config')

const Transaction = sequelize.define("transaction", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DOUBLE
    },
    date: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.CHAR
    },
    type: {
        type: Sequelize.ENUM("Debito", "Credito")
    },
    accountid: {
        type: Sequelize.INTEGER
    },
    balances: {
        type: Sequelize.DOUBLE
    }
}, {
    timestamps: false,
    tableName: 'transaction'

})

module.exports = Transaction