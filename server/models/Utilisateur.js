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

Utilisateur.hasMany(Todo);
Todo.belongsTo(Utilisateur);

// async function generate() {
//     await sequelize.sync({force: true});
// }

// generate().then(() => {
//     console.log("Request done.");
// }).catch((err) => {
//     console.log("ERR: ", err);
// })

module.exports = Utilisateur;