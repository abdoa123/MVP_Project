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
router.post("/",async function(req,res){
    var errors= {};
    if (!validator.isLength(req.body.userName, {
        min: 2,
        max: 30
    })) {
    errors.userName = 'Username should be between 2 and 30 characters'
}
if (validator.isEmpty(req.body.userName)) {
    errors.userName = 'Username is required'
}
if (validator.isEmpty(req.body.Password)) {
    errors.Password = 'Password is required'
}

var j=JSON.stringify(errors);  
console.log(j.length);
if(j.length>2){
    res.json(errors)
}else{
    var test =  db.query('select * from `users` where userName =' + '"'+req.body.userName +'"'+';',function (err, result) {
        console.log(result);
        if (err){
            res.send(err);
        };
        if(result.length===0){
            res.send("user is not Exisit")
        }else{
      bcrypt.compare('123456', '$2b$10$7nDQVCyX1WJ1UaRiCZHFoO74cltrItoXYC4Ead3l0Q1FefjLlhiF6').then(result=>{
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

}

});

module.exports= router;