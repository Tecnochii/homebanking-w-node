const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client.Controller')

const { verifyToken } = require('../middlewares/index')

router.post('/', clientController.createClient)
router.get('/', verifyToken, clientController.getClients)
router.post('/email', clientController.getClientByEmail)
router.get('/:id', verifyToken, clientController.getClient)
router.delete('/:id', verifyToken, clientController.deleteClient)
router.put('/:id', verifyToken, clientController.updateClient)

module.exports = router