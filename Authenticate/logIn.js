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

     db.query('select * from `users` where userName = ' +'"'+req.body.userName+'"' ,function (err, result){
    if (err){
        res.send(err);
    }else{
        var ress=JSON.stringify(req.body.Password);  
    console.log(ress)
     bcrypt.compare(ress,result[0]["hash"]).then(test=>{
        console.log(test);
    })

    }
    /*
            if(check){
                  jwt.sign({ user: user }, 'secretkey', (err, t) => {
                    token = t;
                    db.query('UPDATE `users` SET Token = ' +'"'+ token + '" '+ ' WHERE  userName = '+'"'+req.body.userName +'"',function(err,ress){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.send(token);
                        }
                    });
                });
            }
        
        }*/
});

    

});

module.exports= router;