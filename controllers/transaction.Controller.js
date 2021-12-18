const Transaction = require('../models/Transaction')
const Account = require('../models/Account')

async function getTransactions(req, res) {
    try {
        const transactions = await Transaction.findAll()

        res.json(transactions)
    } catch (error) {
        console.log(error)
    }
}

async function getTransactionsById(req, res) {
    const id = req.params.id
    try {
        const transaction = await Transaction.findAll({
            where: {
                accountid: id
            }
        })

        res.json(transaction)


    } catch (error) {
        console.log(error)
    }
}

async function createTransaction(req, res) {
    const { amount, description, accountOriginNumber, accountToDestNumber } = req.body

    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const account = await Account.findOne({
        where: {
            number: accountOriginNumber
        }
    })

    const accountToDest = await Account.findOne({
        where: {
            number: accountToDestNumber
        }
    })

    if (amount == 0) {
        return res.json('Amoun cannot be 0')
    }
    if (amount > account.balance) {
        return res.json('Balance not enough')
    }
    if (accountOriginNumber == accountToDestNumber) {
        return res.json('Account number cannot be the same')
    }

    try {
        let accountOriginTransaction = await Transaction.create({
            amount: -amount,
            date: date,
            description: description,
            accountid: account.id,
            balances: account.balance - amount,
            type: 'Debito'
        }, {
            fields: ['amount', 'date', 'description', 'accountid', 'balances', 'type']
        })

        let accountDestTransaction = await Transaction.create({
            amount: amount,
            date: date,
            description: description,
            accountid: accountToDest.id,
            balances: accountToDest.balance + amount,
            type: 'Credito'
        }, {
            fields: ['amount', 'date', 'description', 'accountid', 'balances', 'type']
        });


        await account.update({
            balance: account.balance - amount
        })

        await accountToDest.update({
            balance: accountToDest.balance + amount
        })

        return res.json({
            message: 'Transaction Created Successfully',
            accountOrigin: account.balance,
            accountToDest: accountToDest.balance
        })


    } catch (error) {
        return res.json({
            data: error
        })
    }
}





module.exports = {
    createTransaction,
    getTransactions,
    getTransactionsById
}
