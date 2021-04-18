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
    var test = await db.query('select * from `users` where userName =' + '"'+req.body.userName +'"'+';',function (err, result) {
        if (err){
            res.send(err);
        };
        console.log(result[0]["hash"]);
    let check =  bcrypt.compare(req.body.Password, result[0]["hash"]);
            if(check){
                res.send("done");
                  jwt.sign({ user: user }, 'secretkey', (err, t) => {
              res.send(t);
                });
            }
        
   
});

    

});

module.exports= router;