const jwt = require("jsonwebtoken");
const configs = require("../configs/app.config");
var handlebars = require("handlebars");
var mailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

exports.sendEmail = (templateName, locals, user, subject, callback) => {
  const transporter = mailer.createTransport({
    service: configs.EMAIL_SERVICE,
    auth: {
      user: configs.EMAIL_USER,
      pass: configs.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailTemplateSource = fs.readFileSync(
    path.join(__dirname, "../emails/verifypassword.hbs"),
    "utf8"
  );

  const template = handlebars.compile(mailTemplateSource);

  var mailOptions = {
    from: "aletta.nomasonto@gmail.com",
    to: {
      name: user.firstname,
      address: user.email,
    },
    subject: subject,
    html: template(locals),
  };

  transporter.sendMail(mailOptions, function (err, res) {
    if (err) return callback(err);

    callback(nul, res);
  });
};
