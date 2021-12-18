const express = require('express')
const router = express.Router()
const loanController = require('../controllers/loan.Controller')

const { verifyToken } = require('../middlewares/index')

router.get('/', verifyToken, loanController.getLoans)

module.exports = router