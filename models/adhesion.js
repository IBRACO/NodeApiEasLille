const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adhesion', {
    id_Adhesion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    startday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_Utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'adhesion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Adhesion" },
        ]
      },
      {
        name: "id_Utilisateur",
        using: "BTREE",
        fields: [
          { name: "id_Utilisateur" },
        ]
      },
    ]
  });
};
