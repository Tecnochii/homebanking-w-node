const Client = require('../models/Client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const client = await Client.findOne({
            where: {
                email
            }
        })
        const compare = await bcrypt.compare(password, client.password)
        if (compare) {
            const token = jwt.sign({ id: client.id }, config.secret, {
                expiresIn: 4000
            })
            console.log(token)
            if (token == '') {
                res.status(400)
            } else {
                res.cookie("x-acces-token", token)
                res.cookie("client", client.id)

            } res.json({ client_connected: client, token: token })
        } else {
            res.json('client not exist or wrong password ')

        }

    } catch (error) {
        console.log(error)
    }
}

const signUp = async (req, res) => {
    const { email, first_name, last_name, password } = req.body
    try {
        const client = await Client.findOne({
            where: {
                email
            }
        })
        if (client) {
            res.json('Client already exists')
        } else {
            const newClient = await Client.create({
                email,
                first_name,
                last_name,
                password
            }, {
                fields: ['email', 'first_name', 'last_name', 'password']
            })
            res.json(
                {
                    message: 'client created successfully',
                    data: newClient
                }
            )
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signIn,
    signUp
}