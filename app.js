const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const favicon = require('serve-favicon') 

const app = express()
const port = process.env.PORT || 3000

app.use(favicon(__dirname + '/favicon.ico'))
app.use(bodyParser.json())

sequelize.initDb();

app.get('/', (req, res) => {
    res.json('Hello, World !🖐️')
})

/*on placera ici nos futurs points de terminaisons */
require("./src/routes/findAllPokemon")(app)
require("./src/routes/findPokemonByPk")(app)
require("./src/routes/createPokemon")(app)
require("./src/routes/updatePokemon")(app)
require("./src/routes/deletePokemon")(app)
require('./src/routes/login')(app)

//gestion de l'erreure 404
app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demander! vous pouver essayer une autre URL"
    res.status(404).json({ message })
})
app.listen(port, () => console.log(`Notre application Node est demarée sur : http://localhost:${port}`))