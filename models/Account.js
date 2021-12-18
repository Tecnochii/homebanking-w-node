const Sequelize = require('sequelize')
const sequelize = require('../database/config')
const Transaction = require('../models/Transaction')

const Account = sequelize.define('account', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    balance: {
        type: Sequelize.DOUBLE
    },
    creation_date: {
        type: Sequelize.TIME
    },
    number: {
        type: Sequelize.CHAR
    },
    clientid: {
        type: Sequelize.INTEGER,
    },
    accountType: {
        type: Sequelize.CHAR
    },
    status: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    tableName: 'account'

})

Account.hasMany(Transaction, { foreignKey: 'accountid', sourceKey: 'id' })
Transaction.belongsTo(Account, { foreignKey: 'accountid', sourceKey: 'id' })

module.exports = Account