var express = require('express');
var router = express.Router();

const db = require('../models');

/* GET users listing. */
//  router.get('/', function(req, res, next) {
//    res.send('actualité');
//  });


 router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    db.actualite.findAll().then(utilisateur => {
      console.log(utilisateur);
      res.sendStatus(200);
  })
  .catch(err => console.log(err))
  
  
  });

  router.post('/create',function(req,res,next){
    let body = req.body;
  
    db.actualite.create(
      body
   ).then(actu => {
    // res.send("operation saccided");
     res.send(true);
  }).catch(err => {
    //gestion erreur
    // res.send(err.message +": "+"VEUILLEZ UTILISER UN AUTRE EMAIL CAR CE LA A ETE DEJA UTILISEE");
    // console.log(err.message +": "+"VEUILLEZ UTILISER UN AUTRE EMAIL CAR CE LA A ETE DEJA UTILISEE");
    res.send(false);
  });
   })

module.exports = router;
