var express = require('express');
var router = express.Router();

const db = require('../models');

/* GET users listing. */
//  router.get('/', function(req, res, next) {
//    res.send('cotisation');
//  });

 router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    db.contact.findAll().then(utilisateur => {
      console.log(utilisateur);
    //   res.sendStatus(200);
      res.send(utilisateur);
  })
  .catch(err => console.log(err))
  
  
  });

  router.post("/create",(req, res,next)=>{
    let body = req.body;console.log(body);
    const reslt= db.contact.create( body);
    if(reslt){
        res.send(true);

    }else{
        res.send(false); 
    }
  })
  router.post("/delete/:id?",(req, res,next)=>{
    const id = parseInt(req.params.id);
    db.contact.destroy({
      where: { id_Contact: id }
    })
    .then(num => {
      if (num == 1) {
        res.send(
          `the contact with id=${id} was deleted succesfully`
          );
         
      } else {
        res.send(
          `Cannot delete user with id=${id}. Maybe that user was not found!`
       );
      }
    })
  })

module.exports = router;
