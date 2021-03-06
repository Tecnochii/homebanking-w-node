const { json } = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Client = require('../models/Client')

const verifyToken = async (req, res, next) => {
    const token = req.cookies["x-acces-token"]
    console.log(token)
    try {
        if (!token) {
            res.redirect('/')
        } else {
            const decoded = jwt.verify(token, config.secret)

            if (!decoded) {
                return res.json(404).json('invalid token')
            }

            const client = await Client.findOne({
                where: {
                    id: decoded.id
                }
            })

            if (!client) {
                return json.status(400).json({
                    message: 'client not exist'
                })
            } else {
                next()
            }
            console.log(decoded)
        }


    } catch (error) {
        console.log(1, error);
        res.clearCookie("x-acces-token")
        res.status(401).json({ message: 'Unauthorized or Session Expired' })
    }

}

module.exports = {
    verifyToken
}