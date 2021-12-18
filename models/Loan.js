const Sequelize = require('sequelize')
const sequelize = require('../database/config')
const Client_Loan = require('../models/Client_Loan')

const Loan = sequelize.define("loan", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    max_amount: {
        type: Sequelize.DOUBLE
    },
    name: {
        type: Sequelize.CHAR
    },
    porcentaje: {
        type: Sequelize.DOUBLE
    },
    payments: {
        type: Sequelize.CHAR
    }
}, {
    timestamps: false,
    tableName: 'loan'

})

Loan.hasMany(Client_Loan, { foreignKey: 'loan_id', sourceKey: 'id' })
Client_Loan.belongsTo(Loan, { foreignKey: 'loan_id', sourceKey: 'id' })

module.exports = Loan
