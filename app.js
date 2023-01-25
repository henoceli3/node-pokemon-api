const express = require('express')
const helper = require('./helper')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.get('/', (req,res) => res.send("Hello, Express 2 ! 👋"))

app.get('/api/pokemons/:id', (req,res) => {
    /*express transforme tout nos parametres en string donc on itilise le mathode parsInt() pour convertir le para en un int */
    const id = parseInt(req.params.id) 
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "un pokemon a bien ete trouvé"
    res.json(helper.success(message,pokemon)) 
    }
)
app.get("/api/pokemons/", (req,res) =>{
    const pokemonLenght = pokemons.length
    res.json(helper.success(`voici la liste des ${pokemonLenght} pokemons`,pokemons))
})

app.listen(port, ()=> console.log(`Notre application Node est demarée sur : http://localhost:${port}`))