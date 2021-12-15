const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id_Message: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_Message_1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "id_Message_1"
    },
    id_Utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_Utilisateur_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'messages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Message" },
        ]
      },
      {
        name: "id_Message_1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Message_1" },
        ]
      },
      {
        name: "id_Utilisateur",
        using: "BTREE",
        fields: [
          { name: "id_Utilisateur" },
        ]
      },
      {
        name: "id_Utilisateur_1",
        using: "BTREE",
        fields: [
          { name: "id_Utilisateur_1" },
        ]
      },
    ]
  });
};
