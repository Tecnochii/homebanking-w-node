const Loan = require('../models/Loan')
const Transaction = require('../models/Transaction')
async function createLoan(req, res) {

}

async function getLoans(req, res) {
    try {
        const loans = await Loan.findAll()

        res.json(loans)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getLoans
}