const express = require('express')
const router = express.Router()

const cardController = require('../controllers/card.Controller')
const { verifyToken } = require('../middlewares/index')

router.get('/', verifyToken, cardController.getCards)
router.get('/:id', verifyToken, cardController.getCard)
router.post('/', verifyToken, cardController.createCard)
router.delete('/:id', verifyToken, cardController.deleteCard)

module.exports = router