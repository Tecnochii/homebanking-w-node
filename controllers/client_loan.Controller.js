const Client_Loan = require('../models/Client_Loan')
const Client = require('../models/Client')
const Account = require('../models/Account')
const Loan = require('../models/Loan')
async function createLoan(req, res) {

}

async function getLoans(req, res) {
    try {
        const loans = await Client_Loan.findAll()

        res.json(loans)
    } catch (error) {
        console.log(error)
    }
}

async function createLoanAplication(req, res) {
    const { amount, payments, loanId, clientId, accountNumber } = req.body




    try {
        const account = await Account.findOne({
            where: {
                number: accountNumber
            }
        })

        const loan = await Loan.findOne({
            where: {
                id: loanId
            }
        })


        const client_loan = await Client_Loan.create({
            amount: amount + amount * loan.porcentaje,
            payments: payments,
            loan_id: loanId,
            client_id: clientId,
        }, {
            fields: ['amount', 'payments', 'client_id', 'loan_id',]
        })


        await account.update({
            balance: account.balance + amount
        })

        res.json({
            client_loan: client_loan,
            account: account
        })

    } catch (error) {
        res.json({
            data: error
        })
    }
}
module.exports = {
    getLoans,
    createLoanAplication
}