const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
        {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment_body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 125],
          }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        }
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    meme_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'meme',
            key: 'id',
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comments;