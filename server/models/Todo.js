const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

class Todo extends Model {}
Todo.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    titre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        defaultValue: "Aucune description."
    },
    priorite: {
        type: DataTypes.STRING(20),
        defaultValue: "moyenne"
    },
    publication: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Todo'
    }
)

module.exports = Todo;