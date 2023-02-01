const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon ===  null){
          const message = "Le pokemon demandé n'existe pas"
          res.status(404).json({message})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error =>{
      const message = `le pokemon demande n'a pas ete trouve, Veullez ressayer un autre id`
      res.status(500).json({message,data:error})
    })
  })
}