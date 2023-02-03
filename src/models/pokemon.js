const validTypes = ["Plante", "Poison", "Feux","Eau", "Insecte", "Vol","Normal", "Elecktric", "Fée"]
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:"ce nom est deja pris"
        },
        validate:{ 
          notEmpty:{msg:"le nom du pokemon est obligatoire."},
          notNull:{msg:"Le nom est une propriétée requise."}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:"Utilisez uniquement des nombres entier pour les points de vie."},
          notNull:{msg:"Les points de vies sont une proprieté requise."},
          min:{
            args:[0],
            msg:`Les points de vie doivent etre superieurs ou egale a 0`
          },
          max:{
            args:[999],
            msg:`le maximun des point de vie est de 999`
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:"Utilisez uniquement des nombres entier pour les points de vie."},
          notNull:{msg:"Les points de degats sont une proprieté requise."},
          min:{
            args:[0],
            msg:`Les points de vie doivent etre superieurs ou egale a 0`
          },
          max:{
            args:[99],
            msg:`le maximun des points de vie est de 99`
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg:"Utilisez uniquement des Url pour les images."},
          notNull:{msg:"Les images sont une proprieté requise."}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get (){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        valiadate:{
          isTypesValid(value){
            if(!value){
              throw new Error('un pokemon doit avoir au moins un type')
            }
            if(value.split(',').lenght > 3){
              throw new Error('un pokemon ne peux pas avoir plus de 3 types')
            }
            value.split(",").forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d'un pokemon doit appartenir a la liste suivante ${validTypes}`)
              }
            });
          }
        }
      }
    }, 
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}