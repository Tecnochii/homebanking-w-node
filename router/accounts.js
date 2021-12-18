const express = require('express')
const router = express.Router()

const accountController = require('../controllers/account.Controller')
const { verifyToken } = require('../middlewares/index')

router.get('/', verifyToken, accountController.getAccounts)
router.post('/', verifyToken, accountController.createAccount)
router.get('/:id', verifyToken, accountController.getAccount)
router.delete('/:id', verifyToken, accountController.deleteAccount)
router.put('/:id', verifyToken, accountController.updateAccount)
router.get('/client/:clientid', verifyToken, accountController.getAccountByClient)


module.exports = router