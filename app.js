const express = require('express')
const morgan = require("morgan")
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const favicon = require('serve-favicon')

const app = express()
const port = 3000

app.use(favicon(__dirname + '/favicon.ico'))
app.use(morgan("dev"))
app.use(bodyParser.json())

sequelize.initDb();

/*on placera ici nos futurs points de terminaisons */
require("./src/routes/findAllPokemon")(app)
require("./src/routes/findPokemonByPk")(app)
require("./src/routes/createPokemon")(app)
require("./src/routes/updatePokemon")(app)
require("./src/routes/deletePokemon")(app)

app.listen(port, ()=> console.log(`Notre application Node est demarée sur : http://localhost:${port}`))