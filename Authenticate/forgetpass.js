const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');
var cors = require('cors');
var nodemailer = require("nodemailer");

var db = require("../dataBase/dataBaseConnection");
const { token } = require('morgan');
const e = require('express');
app = express();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });


app.use(bodyParser);
var user = {
    tocken: "",
    userName: "",
    password: "",
}
var chee = false;
var nodemailer = require('nodemailer');

router.post('/forgetpass', async function (req, res) {
    console.log(req.body.email);
    let userEmail = req.body.email;
    let userValidationCode = parseInt( Math.random() * (9000 - 1000) + 1000);
    console.log(userValidationCode);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'alaamenshawy464@gmail.com',
          pass: 'gdvxlutkkejrqcqu'
        }
      });
      
      var mailOptions = {
        from: 'alaamenshawy464@gmail.com',
        to: userEmail,
        subject: 'Sending Email using Node.js',
        text: userValidationCode.toString()
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


});


module.exports = router;