const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction.Controller')
const { verifyToken } = require('../middlewares/index')

router.post('/', verifyToken, transactionController.createTransaction)
router.get('/', verifyToken, transactionController.getTransactions)
router.get('/:id', verifyToken, transactionController.getTransactionsById)


module.exports = router