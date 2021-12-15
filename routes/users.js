var express = require('express');
var router = express.Router();
var argon2 = require('argon2');
var Jwt = require('../helpers/Jwt')
const Mail = require('../helpers/mail');

const db = require('../models');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  db.utilisateur.findAll().then(utilisateur => {
    console.log(utilisateur);
    res.json(utilisateur)
    // res.sendStatus(200);
})
.catch(err => console.log(err))
});


 router.get('/:id', function(req, res, next) {
//   // res.send('respond with a resource');
  const id = parseInt(req.params.id)
db.utilisateur.findAll({
  where: {id_Utilisateur: id}, //on veux uniquement ceux qui ont le role "2"
  //order: [['nom', 'ASC']] //classer par ordre alphabétique sur le nom
}).then(utilisateur => {
 //traitement terminé...
 res.json(utilisateur)
});
 });
 router.post('/verifToken',function(req,res,next){
  let body = req.body;
  db.utilisateur
    .findOne({
       where: { token: body.token },
    })
    .then((data) => {
      console.log(data);
      if(data.nom){
        data.status =" true"
        res.json(data);
      }else{
        res.json(false);
      }
    }).catch(err => {
      console.log("impossible mission")
      //gestion erreur
      res.status(200).send({ 
        message:
        err.message || "some error."
      })
  });
 })
 router.post('/motdepassoublier',function(req,res,next){
  let body = req.body;
  db.utilisateur
    .findOne({
       where: { email: body.email },
    })
    .then((data) => {
      console.log(data);
      if(data.nom){
         
        const to = data.email;
        const subject = "refaire votre mot de passe";
        const text = "veuiller cliquer sur ce lien pour pouvoire creeer votre mot de pass";
        Mail.send(to,subject,text);
        res.json(true);
      }else{
        res.json(false);
      }
    }).catch(err => {
      console.log("impossible mission")
      //gestion erreur
      res.status(200).send({ 
        message:
        err.message || "some error."
      })
  });
 })



 router.post("/updatepass",function(req,res,next){
  let body = req.body;
  let email = body.email;
  delete body.email;

  argon2.hash(body.password,{
    type: argon2.argon2id,
    memoryCost: 1024,
    parallelism: 2,
    timeCost : 2
  }).then(hash=>{
    body.password = hash.replace(Jwt.prefix,'');
    
    db.utilisateur.update(body, {
      // where: { id_Utilisateur: id }
      where: { email: email }
    })
      .then(num => {
        res.send(num);
      })
      .catch(err => {
        res.send(err.message +" "+ " update impossible");
        
   });
  });
})
 

  // argon2.hash(body.password,{
  //   type: argon2.argon2id,
  //   memoryCost: 1024,
  //   parallelism: 2,
  //   timeCost : 2
  // }).then(hash=>{
  //   body.password = hash.replace(Jwt.prefix,'');
    
  //   db.utilisateur.update(body, {
  //     where: { email: email }
  //   })
  //     .then(num => {
  //       res.send(num);
  //     })
  //     .catch(err => {
  //       res.send(err.message +" "+ " update impossible");
        
  //  });
   
  

 router.get('/:email', function(req, res, next) {
//   // res.send('respond with a resource');
  const email = req.params.email
db.utilisateur.findAll({
  where: {email: email}, //on veux uniquement ceux qui ont le role "2"
  //order: [['nom', 'ASC']] //classer par ordre alphabétique sur le nom
}).then(utilisateur => {
  console.log(utilisateur)
 //traitement terminé...
 res.json(utilisateur)
});
 });

// router.get('/',function(req,res,next){
//    try{
//      db.utilisateur.create({nom:"gahungu",
//     prenom : "abas",
//     email:'gahungu@gmail.com',
//      password:'azerty',
//      telephone:78544555,
//      adresse:"105 rue",
//      is_active:true,
//      deleted:false},{ fields: ['prenom'] }
//      );
//      console.log(utilisateur.prenom);
//   }catch{
//     res.json("ca echoue")
//   }
//   })

  router.get("/",function(req,res,next){
    db.utilisateur.create({
      nom:'gahungu',
      prenom : "abas",
      email:'rogers@gmail.com',
       password:'azerty',
       telephone:78544555,
       adresse:'105 rue',
       role : 1,
       is_active:true,
       deleted:false
  }).then(user => {
      res.send("operation saccided");
  }).catch(err => {
      //gestion erreur
      res.status(500).send({
        message:
        err.message || "some error."
      })

     
    
  });
  })




 //POST create a user
router.post('/:action/:id?', (req,res) => {
  const action = req.params.action;
  const id = parseInt(req.params.id);
  // let body = req.body;
  if(action === 'create'){
    let body = req.body;
   
 


    //ugfifuiuhg
    argon2.hash(body.password,{
      type: argon2.argon2id,
      memoryCost: 1024,
      parallelism: 2,
      timeCost : 2
    }).then(hash=>{
      body.password = hash.replace(Jwt.prefix,'');
      //  body.password = hash;
       db.utilisateur.create(
        body
     ).then(user => {
      // res.send("operation saccided");
       res.send(true);
  }).catch(err => {
      //gestion erreur
      // res.send(err.message +": "+"VEUILLEZ UTILISER UN AUTRE EMAIL CAR CE LA A ETE DEJA UTILISEE");
      // console.log(err.message +": "+"VEUILLEZ UTILISER UN AUTRE EMAIL CAR CE LA A ETE DEJA UTILISEE");
      res.send(false);
    });
    });



 }
  if(action === 'update'){
    let body = req.body;
    
    argon2.hash(body.password,{
      type: argon2.argon2id,
      memoryCost: 1024,
      parallelism: 2,
      timeCost : 2
    }).then(hash=>{
      body.password = hash.replace(Jwt.prefix,'');
      
      db.utilisateur.updateAttributes(body, {
        where: { id_Utilisateur: id }
      
      })
        .then(num => {
          res.send(num);
        })
        .catch(err => {
          res.send(err.message +" "+ " update impossible");
          
     });
     
    });
    

  
  }
   if(action === 'delete'){//update sur col active
    const id = parseInt(req.params.id);
    db.utilisateur.destroy({
      where: { id_Utilisateur: id }
    })
    .then(num => {
      if (num == 1) {
        res.send(
          `the user with id=${id} was deleted succesfully`
          );
      } else {
        res.send(
           `Cannot delete user with id=${id}. Maybe that user was not found!`
        );
      }
    })
      // .then( 
      //   res.send("The user was destroyed")
      // )
      // .catch(err => {
      //   res.send(err.message +" "+ " impossible to destroy");
        
  //  });
    


   }
  
 });


 //POST create a user
// router.post('/:action', (req,resp) => {
//   const action = req.params.action;
//   if(action === 'create'){
//     let body = req.body;
//     Object.keys(body).map((key)=>{
//       body[key] = db.escape(body[key])
//     })
//     let sql = `INSERT INTO user SET ?`;
//     db.query(sql,body,(err,result)=>{
//       if(err) console.log(err);
//       resp.json(result.insertId)
//     })
//   }
//   if(action === 'update'){

//   }
//   if(action === 'delete'){//update sur col active

//   }
  
// });
module.exports = router;
