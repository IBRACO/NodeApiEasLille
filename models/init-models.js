var DataTypes = require("sequelize").DataTypes;
var _actualite = require("./actualite");
var _adhesion = require("./adhesion");
var _appartenir = require("./appartenir");
var _contenir = require("./contenir");
var _cotisation = require("./cotisation");
var _img = require("./img");
var _messages = require("./messages");
var _utilisateur = require("./utilisateur");
var _video = require("./video");

function initModels(sequelize) {
  var actualite = _actualite(sequelize, DataTypes);
  var adhesion = _adhesion(sequelize, DataTypes);
  var appartenir = _appartenir(sequelize, DataTypes);
  var contenir = _contenir(sequelize, DataTypes);
  var cotisation = _cotisation(sequelize, DataTypes);
  var img = _img(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);
  var video = _video(sequelize, DataTypes);


  return {
    actualite,
    adhesion,
    appartenir,
    contenir,
    cotisation,
    img,
    messages,
    utilisateur,
    video,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
