const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
  
/*connexion a la base donées */
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

/*creation du modele de notre bd */
const Pokemon = PokemonModel(sequelize, DataTypes)

/*synchronisation de notre bd*/
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}

/*on exporte la function initDB et le modele pokemon */
module.exports = { 
  initDb, Pokemon
}