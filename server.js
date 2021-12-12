const express = require("express");
const { MessageEmbed } = require("discord.js");
const bodyParser = require("body-parser");
const server = express();
const https = require("https")
const fs = require("fs")
const privateKey = fs.readFileSync(__dirname + '/selfsigned.key');
const certificate = fs.readFileSync(__dirname + '/selfsigned.crt');
const credentials = {key: privateKey, cert: certificate};


server.engine("html", require("ejs").renderFile);
server.use(bodyParser.urlencoded({ extended: true }));
const session = require("express-session");
const compression = require("compression");
const request = require("request");
const client = require("./index.js")

server.use(compression());
server.disable("x-powered-by");
server.set("trust proxy", 1);
server.use(
  session({
    name: "sitedata",
    rolling: true,
    secret: `EfT4AVq9r-F,.FRclHc#Y##QJNT^^fY#3Wxd#ci8Z@KrEn6T2^^%7m%H26wUj&4Ena&uqLX!m!6Ca&%ubd*9FddGWSjayV8NyW4anKGCQQ#xYcY%e6Jh6PA37T2wug@KCkpSmfk`,
    resave: true,
    proxy: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 * 12, secure: true }
  })
);

server.use(express.static("assets"));

server.all("/", (req, res) => {
  return res.render(__dirname + "/html/discord.html")
});

server.get(`/verify`, async (req, res) => {
  var options = {
    method: "POST",
    url: "https://discord.com/api/oauth2/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      client_id: client.config.captcha.settings.client_id,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: client.config.captcha.settings.callback_url,
      scope: ["identify", "email", "guilds.join"]
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var oauth_parsed = JSON.parse(body);
    var options = {
      method: "GET",
      url: "https://discord.com/api/users/@me",
      headers: { authorization: `Bearer ${oauth_parsed.access_token}` }
    };
    request(options, async function (error, response, body) {
      var parsed = JSON.parse(body);
      let guildGet = client.guilds.cache.get(client.config.guildId);
      const userguild = guildGet.members.cache.get(parsed.id);
      if (error) throw new Error(error);
      if (req.session.verify_userid) {
        return res.render(__dirname + "/html/captcha.html", {
          recaptcha_sitekey: process.env.RECAPTCHA_SITEKEY,
          parsed_user_avatar_url: `https://cdn.discordapp.com/avatars/${parsed.id}/${parsed.avatar}.png?size=128`
        });
      }
      if (response.statusCode != 200) {
        return res.redirect(
          `https://discord.com/oauth2/authorize?client_id=${
          client.config.captcha.settings.client_id
          }&redirect_uri=${
          client.config.captcha.settings.callback_url
          }&response_type=code&scope=guilds.join%20email%20identify`
        );
      }
      
      
      if (userguild.roles.cache.has(client.config.captcha.roles.veri)) {
        return res.render(__dirname + "/html/success.html", {
          success_msg: "You already verified!"
        });
      }

      req.session.verify_userid = parsed.id;

      if ((client.config.captcha.settings.verified_email_required = true || parsed.verified)) {
        req.session.verify_status = "waiting_recaptcha";
        return res.render(__dirname + "/html/captcha.html", {
          recaptcha_sitekey: process.env.RECAPTCHA_SITEKEY,
          parsed_user_avatar_url: `https://cdn.discordapp.com/avatars/${parsed.id}/${parsed.avatar}.png?size=128`
        });
      } else {
        await req.session.destroy();
        return res.render(__dirname + "/html/error.html", {
          error_msg: "Please verify your email!"
        });
      }
    });
  });
});

server.post("/verify/solve/", async (req, res) => {
  if (!req.session.verify_userid || !req.body["g-recaptcha-response"]) {
    return res.redirect("/verify");
  }

  var options = {
    method: "POST",
    url: "https://www.google.com/recaptcha/api/siteverify",
    headers: {
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
    },
    formData: {
      secret: process.env.RECAPTCHA_SECRET,
      response: req.body["g-recaptcha-response"]
    }
  };
  request(options, async function (error, response, body) {
    if (error) throw new Error(error);
    const parsed = JSON.parse(body);
    console.log(parsed);
    if (parsed.success) {
      const embed = new MessageEmbed();
      let guildGet = client.guilds.cache.get(client.config.guildId);
      let userfetch = await client.users.fetch(req.session.verify_userid);
      const member = await guildGet.members.fetch(userfetch.id);
      await member.roles.add(client.config.captcha.roles.veri);
      try {
        req.session.verify_status = "done";
        client.logger.log(`Captcha: Step 1/2: User: ${member.tag}, ${member.tag} completed step 1/2.`)
        member.roles.add(client.config.captcha.roles.veri2)
        member.roles.remove(client.config.captcha.roles.noveri)
        client.captcha(member)
        return res.redirect("/verify/succeed");
      } catch (e) {
        return res.redirect("/verify/succeed");
      }
    } else {
      res.redirect("/verify");
    }
  });
});

server.get("/verify/succeed", async (req, res) => {
  if (!req.session.verify_userid) return res.redirect("/verify");
  if (req.session.verify_status != "done") return res.redirect("/verify");
  res.sendFile(__dirname + "/html/verified.html");
  return req.session.destroy();
});

server.get("/verify/logout", async (req, res) => {
  if (!req.session.verify_userid)
    return res.render(__dirname + "/html/error.html", {
      error_msg: `You did not login!`
    });
  await req.session.destroy();
  return res.render(__dirname + "/html/success.html", {
    success_msg: `Done logout!`
  });
});

function express_server() {
  const serverOnline = server.listen(8080)
   if(serverOnline) {
      client.logger.log("Https X Express: HTTPS Server is ready!");
   }
}

module.exports = express_server;