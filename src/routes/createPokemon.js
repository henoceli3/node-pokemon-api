const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error =>{
        if(error instanceof ValidationError){
          res.status(400).json({message:error.message,data:error})
        }
        if(error instanceof UniqueConstraintError){
          res.sta(400).json({message:error.message,data:error})
        }
        const message = `Le pokemons n'a pas pu etre ajouté, Veullez ressayer dans quelques instants`
        res.status(500).json({message,data:error})
      })
  })
}