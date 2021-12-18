const express = require('express')
const router = express.Router()

const client_loan_Controller = require('../controllers/client_loan.Controller')
const { verifyToken } = require('../middlewares/index')

router.get('/', verifyToken, client_loan_Controller.getLoans)
router.post('/', verifyToken, client_loan_Controller.createLoanAplication)


module.exports = router