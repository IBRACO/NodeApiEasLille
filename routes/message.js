var express = require('express');
var router = express.Router();

const db = require('../models');

/* GET users listing. */
//  router.get('/', function(req, res, next) {
//    res.send('messages zanyu ntizibaho ga naani');
//  });


 router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    db.messages.findAll().then(utilisateur => {
      console.log(utilisateur);
      res.sendStatus(200);
  })
  .catch(err => console.log(err))
  
  
  });

module.exports = router;
