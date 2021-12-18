const Card = require('../models/Card')


async function getCards(req, res) {
    const cards = await Card.findAll()

    res.json(cards)
}

async function getCard(req, res) {
    const id = req.params.id
    const card = await Card.findOne({
        where: {
            id
        }
    })

    res.json(card)
}

async function createCard(req, res) {
    const { cardholder, color, client_id, type } = req.body

    const cvv = Math.floor(Math.random() * (999 - 100))
    const from_date = new Date()

    function randomNumber(desde, hasta) {
        return Math.floor(Math.random() * (desde - hasta))
    }

    const number = "2000-" + randomNumber(9999, 1000) + "-" + randomNumber(9999, 1000) + "-" + randomNumber(9999, 1000);
    const date = new Date()
    const thru_date = date.setFullYear(date.getFullYear() + 5);


    const card = await Card.create({
        cardholder,
        color,
        cvv,
        from_date,
        number,
        thru_date,
        client_id,
        type
    }, {
        fields: ['cardholder', 'color', 'cvv', 'from_date', 'number', 'thru_date', 'client_id', 'type']
    })

    res.json(card)
}

async function deleteCard(req, res) {
    const id = req.params.id
    try {
        const response = await Card.destroy({
            where: { id }
        })
        if (response) {
            res.json({
                message: 'Card with id: ' + id + ' deleted',
                count: response
            })
        }
    }
    catch (err) { res.json({ data: err }) }
}

module.exports = {
    getCard,
    getCards,
    createCard,
    deleteCard
}