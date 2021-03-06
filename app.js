const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cookieParser = require('cookie-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

require("dotenv").config()

const port = process.env.PORT || 3000


//Donde cargar los archivos estaticos
app.use(express.static(__dirname + "/public"))

//Motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");



//rutas
app.use("/", require("./router/rutasWeb"))
app.use("/api/clients", require("./router/clients"))
app.use("/api/accounts", require("./router/accounts"))
app.use("/api/auth", require("./router/authRoutes"))
app.use("/api/transactions", require("./router/transaction"))
app.use("/api/loans", require("./router/loans"))
app.use("/api/client/loans", require("./router/client_loans"))
app.use("/api/cards", require("./router/cards"))




app.use((req, res, next) => {
    res.status(404).render("404")
})


app.listen(port, () => {
    console.log("escuchando en el puerto " + port)
})