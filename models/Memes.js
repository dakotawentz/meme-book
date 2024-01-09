const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Meme extends Model {}

Meme.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {        
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
    caption: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    }
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
