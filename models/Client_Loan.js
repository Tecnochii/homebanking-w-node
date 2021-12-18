const Sequelize = require('sequelize')
const sequelize = require('../database/config')


const Client_Loan = sequelize.define('client_loan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.DOUBLE,
    },
    payments: {
        type: Sequelize.INTEGER
    },
    client_id: {
        type: Sequelize.INTEGER
    },
    loan_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'client_loan'

})

module.exports = Client_Loan