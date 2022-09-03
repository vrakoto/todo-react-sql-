const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

class Todo extends Model {}
Todo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    priorite: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "Moyenne"
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