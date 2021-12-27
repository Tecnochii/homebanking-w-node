const Client = require('../models/Client')
const Account = require('../models/Account')
const Card = require('../models/Card')
const Client_Loan = require('../models/Client_Loan')


async function getClients(req, res) {
    try {
        const clients = await Client.findAll({
            attributes: ['id', 'email', 'first_name', 'last_name'],
            order: [
                ['id', 'ASC']
            ],
            include: [
                Account,
                Card,
                Client_Loan
            ],
        })

        res.json(clients)
    } catch (error) {
        console.log(error)
    }
}

async function getClient(req, res) {
    const id = req.params.id
    try {
        const client = await Client.findOne({
            attributes: ['id', 'email', 'first_name', 'last_name'],
            where: {
                id: id
            },
            include: [
                Account,
                Card,
                Client_Loan
            ],

        })

        res.json({
            client: client,

        })


    } catch (error) {
        console.log(error)
    }
}
async function getClientByEmail(req, res) {
    const { email } = req.body
    try {
        const client = await Client.findOne({
            attributes: ['id', 'email', 'first_name', 'last_name'],
            where: {
                email: email
            },
            include: [
                Account,
                Card,
                Client_Loan
            ],

        })

        res.json({
            client: client,

        })


    } catch (error) {
        console.log(error)
    }
}
async function createClient(req, res) {
    const { email, first_name, last_name, password } = req.body
    try {
        let newClient = await Client.create({
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password
        }, {
            fields: ['email', 'first_name', 'last_name', 'password']
        });


        if (newClient) {

            const number = "VIN-" + Math.floor(Math.random() * (99999 - 00000));
            const creation_date = new Date()

            const newAccount = await Account.create({
                balance: 0,
                number: number,
                creation_date: creation_date,
                clientid: newClient.id,
                accountType: "Ahorro",
                status: true
            }, {
                fields: ['balance', 'number', 'creation_date', 'clientid', 'accountType', 'status']
            });


            return res.json({
                message: 'client Created Successfully',
                data: newClient,
            })
        }

    } catch (error) {
        return res.json({
            message: 'Error',
            data: {}
        })
    }
}

async function deleteClient(req, res) {
    const id = req.params.id

    try {
        let response = await Client.destroy({
            where: {
                id: id
            }
        })
        if (response) {
            res.json({
                message: 'Cliente with id: ' + id + ' deleted',
                count: response
            })
        } else {
            res.json('Cliente with id: ' + id + ' doesnt exists')

        }
    } catch (error) {
        console.log(error)
    }


}

async function updateClient(req, res) {
    const id = req.params.id
    const { email, first_name, last_name, password } = req.body

    try {
        const clients = await Client.findAll({
            attributes: ['id', 'email', 'first_name', 'last_name', 'password'],
            where: {
                id
            }
        })

        if (clients.length > 0) {
            clients.forEach(async client => {
                await client.update({
                    email,
                    first_name,
                    last_name,
                    password
                })
            });
        }

        return res.json({
            message: "update succefully",
            data: clients
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
    getClientByEmail
}
