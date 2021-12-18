const Sequelize = require('sequelize')
const sequelize = require('../database/config')
const bcrypt = require('bcrypt')

const Account = require('../models/Account')
const Card = require('../models/Card')
const Client_Loan = require('../models/Client_Loan')

const Client = sequelize.define('client', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    email: {
        type: Sequelize.CHAR
    },
    first_name: {
        type: Sequelize.CHAR
    },
    last_name: {
        type: Sequelize.CHAR
    },
    password: {
        type: Sequelize.CHAR
    }

}, {
    hooks: {
        beforeCreate(Client) {
            Client.password = bcrypt.hashSync(Client.password, 10);
            //User.idRole = 1; esto no permitiria que un proceso de creacion de usuario pueda dar como resultado un user admin/otro
        }
    },

    timestamps: false,
    tableName: 'client'
})



Client.hasMany(Account, { foreignKey: 'clientid', sourceKey: 'id' })
Account.belongsTo(Client, { foreignKey: 'clientid', sourceKey: 'id' })

Client.hasMany(Card, { foreignKey: 'client_id', sourceKey: 'id' })
Card.belongsTo(Client, { foreignKey: 'client_id', sourceKey: 'id' })

Client.hasMany(Client_Loan, { foreignKey: 'client_id', sourceKey: 'id' })
Client_Loan.belongsTo(Client, { foreignKey: 'client_id', sourceKey: 'id' })

module.exports = Client