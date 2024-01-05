const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Meme extends Model {}

Meme.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meme',
  }
);


module.exports = Meme;
