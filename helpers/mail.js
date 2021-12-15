var nodemailer = require("nodemailer");
var Jwt = require("../helpers/Jwt");
const db = require("../models");

class Mail {
  static send(to, subject, text) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "buyoyaibrahim92@gmail.com",
        pass: "Ibrahim_mouhammad&2021",
      },
    });

    const time = Math.round(Date.now() / 1000);
    // ici je creer le token en se servant de l'adresse mail de la personne à qui je vais envoyer le mail
    let payload = { email: to, time };
    Jwt.create(payload).then((token) => {
      // il faudra que je soustraire les slash dans le token
      // const token = token.replace("/", "");
      const body = { token };
      console.log(body);
      db.utilisateur.update(body, {
        where: { email: to },
      });
      var mailOptions = {
        from: "buyoyaibrahim92@gmail.com",
        to,
        subject,
        text,
        html: `<br><a href="http://localhost:3000/updatepass/${token} "target="_blank">Valider votre compte</a><br>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  }
}
module.exports = Mail;
