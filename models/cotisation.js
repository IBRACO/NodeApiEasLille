const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cotisation', {
    id_Cotisation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mois: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    montant: {
      type: DataTypes.DECIMAL(2,2),
      allowNull: false
    },
    datecotisation: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    moyen: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_Utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cotisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Cotisation" },
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
