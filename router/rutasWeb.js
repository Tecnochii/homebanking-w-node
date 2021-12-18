const express = require("express")
const router = express.Router();
const { verifyToken } = require('../middlewares/index')
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.get("/", (req, res) => {
    const token = req.cookies["x-acces-token"]
    if (token != null) {
        res.render("accounts")

    }
    res.render("index")
})

router.get("/accounts", verifyToken, (req, res) => {

    res.render("accounts")
})

router.get("/account", verifyToken, (req, res) => {
    res.render("account")
})

router.get("/cards", verifyToken, (req, res) => {
    res.render("cards")
})

router.get("/loans", verifyToken, (req, res) => {
    res.render("loans")
})

router.get("/transfers", verifyToken, (req, res) => {
    res.render("transfers")
})

router.get("/create-cards", verifyToken, (req, res) => {
    res.render("create-cards")
})

router.get("/logout", verifyToken, (req, res) => {
    res.clearCookie("x-acces-token")
    res.clearCookie("transaction")
    res.clearCookie("client")

    res.redirect("/")
})
module.exports = router