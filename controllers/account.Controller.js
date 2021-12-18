const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

async function getAccounts(req, res) {
    let accounts = await Account.findAll({
        include: Transaction
    })
    res.json(accounts)
}

async function createAccount(req, res) {
    const { clientid, accountType } = req.body

    const number = "VIN-" + Math.floor(Math.random() * (99999 - 00000));
    const creation_date = new Date()
    const accounts = await Account.findAll({
        where: {
            clientid,
            status: true
        }
    })


    console.log(accounts.length)

    try {
        if (accounts.length < 3) {
            const newAccount = await Account.create({
                balance: 0,
                number: number,
                creation_date: creation_date,
                clientid: clientid,
                accountType: accountType,
                status: true
            }, {
                fields: ['balance', 'number', 'creation_date', 'clientid', 'accountType', 'status']
            })
            if (newAccount) {
                return res.json({
                    message: 'account Created Successfully',
                    data: newAccount
                })
            }
        } else {
            return res.json('Already have three accounts')
        }
    } catch (error) {
        return res.json({
            message: 'Error:' + error,
            data: {}
        })
    }
}
async function deleteAccount(req, res) {
    const id = req.params.id
    try {
        const account = await Account.findOne({
            where: {
                id: id
            }
        })

        await account.update({
            status: false
        })
        console.log(account)
        res.json('Account deleted')
    } catch (error) {
        console.log(error)
        res.json({
            message: error,
            data: {}
        })
    }
}
async function getAccount(req, res) {
    const id = req.params.id
    try {
        const account = await Account.findOne({
            where: {
                id: id
            },
            include: Transaction
        })
        if (account) {

            res.json(account)
        } else {
            res.json('account not exist')
        }

    } catch (error) {
        console.log(error)
        res.json({
            message: "error",
            data: {}
        })
    }
}
async function updateAccount(req, res) {
    const id = req.params.id
    const { balance } = req.body
    try {
        const accounts = await Account.findAll({
            attributes: ['id', 'balance', 'creation_date', 'number', 'clientid', 'accountType', 'status'],
            where: {
                id
            }
        })

        if (accounts.length > 0) {
            accounts.forEach(async account => {
                await account.update({
                    balance
                })
            });
            return res.json({
                message: "update succefully",
                data: accounts
            })
        }
        else {
            res.json('Accoun not updates or not exist')
        }


    } catch (error) {
        console.log(error)
        res.json({
            message: error,
            data: {}
        })
    }
}

async function getAccountByClient(req, res) {
    const { clientid } = req.params

    try {
        let accounts = await Account.findAll({
            where: {
                clientid
            }
        })
        if (accounts) {
            res.json(accounts)
        } else {
            res.json('not accounts')
        }
    } catch (error) {
        console.log(erro)
        res.send(error)
    }
}



module.exports = {
    getAccounts,
    createAccount,
    deleteAccount,
    updateAccount,
    getAccount,
    getAccountByClient
}