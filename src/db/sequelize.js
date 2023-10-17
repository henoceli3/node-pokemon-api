const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

/*connexion a la base donées */
const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

/*creation du modele de notre bd */
const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

/*synchronisation de notre bd*/
const initDb = async () => {
  const _ = await sequelize.sync({ force: true });
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types,
    }).then((pokemon_1) => console.log(pokemon_1.toJSON()));
  });
  bcrypt
    .hash("pikachu", 10)
    .then((hash) => User.create(
      {
        username: "pikachu",
        password: hash,
      },
      {
        username: "twitter",
        password: hash,
      }
    )
    )
    .then((user) => console.log(user.toJSON()));
  console.log("La base de donnée a bien été initialisée !");
};

/*on exporte la function initDB et le modele pokemon */
module.exports = {
  initDb,
  Pokemon,
  User,
};
