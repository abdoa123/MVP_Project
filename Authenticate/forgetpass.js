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
    db.query('UPDATE `users` SET code = '+'"'+userValidationCode+'"'+" where Email= "+'"'+req.body.email+'"',function(err,result){
      if(err){
          console.log(err);
        res.send(err)
      }
      else{
          console.log(result);
         res.send("done")
      }
  })
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

router.post('/getCode',function(req,res){
  db.query('UPDATE `users` SET code = '+userValidationCode+"where Email= "+req.body.email,function(err,result){
    if(err){
        console.log(err);
       res.send(err)
    }
    else{
        console.log(result);
        res.send(result);
    }
})
  });

  router.post('/updatePass',function(req,res){
    var newHash = await bcrypt.hash(req.body.newPassword, 10);

    db.query('UPDATE `users` SET hash = '+newHash+"where Email= "+req.body.email,function(err,result){
      if (err) {
           
            res.send(err); 
        }
        else{
        
          res.send("done");
        }
    });


});


module.exports = router;