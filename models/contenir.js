const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contenir', {
    id_Actualite: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_Img: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'contenir',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Actualite" },
          { name: "id_Img" },
        ]
      },
      {
        name: "id_Img",
        using: "BTREE",
        fields: [
          { name: "id_Img" },
        ]
      },
    ]
  });
};
