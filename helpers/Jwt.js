const argon2 = require("argon2");
class Jwt {
  static prefix = "$argon2id$v=19$m=1024,t=2,p=2$";
  static token;
  static async create(payload) {
    payload = Buffer.from(JSON.stringify(payload)).toString("base64");

    let signature = await argon2.hash(payload, {
      type: argon2.argon2id,
      memoryCost: 1024,
      parallelism: 2,
      timeCost: 2,
    });

    //return payload + "$" + signature.replace(this.prefix, "");
    let res =payload + "$" + signature.replace(this.prefix, "");
    console.log(res)
    return res.replace("/", "")
    
  }

  static async verify(token) {
    if (!token) return false;
    
    let payload = token.split("$")[0];
    let signature = token.replace(payload + "$", "");
    let verify = await argon2.verify(this.prefix + signature, payload);
    if (verify) {
      payload = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
      return payload;
    }
    return false;
  }

  // static renew(token){

  // }
}

module.exports = Jwt;