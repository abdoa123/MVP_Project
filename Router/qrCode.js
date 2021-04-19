const QRCode = require('qrcode')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');


router.post('/genrateQR', async function(req,res){
    QRCode.toDataURL(stringdata, function (err, url) {
        if(err) return console.log("error occured")
        console.log(url)
      })
      
 /*   
let data = {
    name:req.body,
    age:27,
    department:"Police",
    id:"aisuoiqu3234738jdhf100223"
  }*/
    let a = db.query('INSERT INTO `nurse` (firstName, lastName, Email,degree,address,phone,userName,password , Date) VALUES  (' +'"'+ req.body.firstName +'"'+ 
        ',' +'"'+ req.body.lastName +'"' +','+'"'+ req.body.Email + '"'+
        ',' +'"'+ req.body.degree+'"' +','+ '"'+req.body.Address + '"'+',' + req.body.phone +','+'"'+ req.body.userName +'"'+ ','+'"'+req.body.password +'"'+','+'"'+req.body.Date+'"'+')', function (err1, result2) {
       if (err1) {
           console.log(err1)
       } else {

           res.send("1 record inserted")
       }

   });
});
let stringdata = JSON.stringify(data)

