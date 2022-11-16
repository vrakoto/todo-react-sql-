const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

const Todo = require('./Todo');

class Utilisateur extends Model {}
Utilisateur.init({
    identifiant: {
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    mdp: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Utilisateur'
    }
)

Utilisateur.hasMany(Todo)

// Utilisateur.belongsToMany(Produit, { through: 'panier_produits' })
// Todo.belongsToMany(Panier, { through: 'panier_produits' })

/* async function generate() {
    await sequelize.sync({alter: true});
}

generate().then(() => {
    console.log("Request done.");
}).catch((err) => {
    console.log("ERR: ", err);
}) */

module.exports = Utilisateur;