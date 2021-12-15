var express = require("express");
var router = express.Router();
var Jwt = require("../helpers/Jwt");
var argon2 = require("argon2");

const Mail = require('../helpers/mail');

const db = require("../models");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", (req, res, next) => {
  //recuperation des information venant du front(formulaire d'autentification)
  let body = req.body;
  db.utilisateur
    .findAll({
      where: { email: body.email }, //on veux uniquement ceux qui ont le role "2"
      //order: [['nom', 'ASC']] //classer par ordre alphabétique sur le nom
    })
    .then((data) => {
      console.log(data);

      if (data.length === 1) {
        data = data[0];
        //verification du mot de pass venant du front contre celle de la base de donnée
        argon2
          .verify(Jwt.prefix + data.password, body.password)
          .then((result, error) => {
            if (error) throw error;
            if (result) {
              const id = data.id_Utilisateur;
              const email = data.email;
              const role = data.role;
              const time = Math.round(Date.now() / 1000);
              const customerId = data.id_Utilisateur;
              let payload = { id, email, role, time, customerId };
              delete data.password;
              //creation du token
              Jwt.create(payload).then((token) => {
                res.json({  user :data, token });
                console.log({  user :data, token });
              });
            } else {
              res.json(false);
              console.log("tokenisation impossible");
            }

            //traitement terminé...
            // res.json(data)
          });
      } else {
        // res.json(false);
         res.json(false);
         console.log(200)
      }
    });
});

router.post('/mail', function(req, res, next) {
  //console.log("register")
  const {to,subject,text} = req.body
  // db.utilisateur.update()



  // const time = Math.round(Date.now() / 1000);
  // let payload = { email:to,  time };
  //   Jwt.create(payload).then((token) => {
  //     // let body = {token:{token}}
  //     let body = {token : token}
  //     db.utilisateur.update(body, {
  //       // where: { id_Utilisateur: id }
  //       where: { email: to }
  //     })
  //       .then(num => {
  //         res.send(num);
  //       })
  //       .catch(err => {
  //         res.send(err.message +" "+ " update impossible");
          
  //    });


  //     Mail.send(to,subject,text);

    



  Mail.send(to,subject,text);
})
// })



module.exports = router;
