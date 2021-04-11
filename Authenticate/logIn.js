const express = require('express');
const router = express.Router();
const jwt= require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
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
    console.log(req[data]);
   var test = await db.query('select * from `users` where userName =' + req.body.userName +';',function (err, result) {
    if (err){
        res.send(err);
    };
    let check =  bcrypt.compare(req.body.password, result[0]["hash"]);
            if(check){
                  jwt.sign({ user: user }, 'secretkey', (err, t) => {
                    token = t;
                    db.query('UPDATE `users` SET Token = ' +'"'+ token + '" '+ ' WHERE  userName = '+req.body.userName ,function(err,ress){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.send(token);
                        }
                    });
                });
            }
        
   
});

    

});

module.exports= router;
