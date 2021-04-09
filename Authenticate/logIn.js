const express = require('express');
const router = express.Router();
const jwt= require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
// connect to database
var db=require("../dataBase/dataBaseConnection");


router.post("/",async function(req,res){

   var test = await db.query('select * from `users` where userName =' + req.body.userName +';',function (err, result) {
    if (err){
        res.send(err);
    };
    let check =  bcrypt.compare(req.body.password, result[0]["hash"]);
            if(check){
             res.send('password correct');
            }
   
});

    

});

module.exports= router;
