const express = require('express');
const router = express.Router();
const jwt= require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const validator = require('validator')

const bcrypt = require("bcrypt");
// connect to database
var db=require("../dataBase/dataBaseConnection");
var user = {
    tocken: "",
    userName: "",
    password: "",
}
var token ;
router.post("/",function(req,res){
 
    var test =  db.query('select * from `users` where userName =' + '"'+req.body.userName +'"'+';',function (err, result) {
        if (err){
            res.send(err);
        };
        console.log('res=> ',result);
        if(result.length===0){
            res.send("user is not Exisit")
        }else{
      bcrypt.compare(req.body.Password,result[0].hash).then(result=>{
        if(result){
            jwt.sign({ user: user }, 'secretkey', (err, t) => {
                res.send(t);
                  });
        }
        else{
            res.send("wrong password");
        }
    });
}
   
});



});

module.exports= router;