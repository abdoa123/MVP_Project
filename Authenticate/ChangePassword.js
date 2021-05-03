const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
// connect to database
var db=require("../dataBase/dataBaseConnection");
router.post("/", function(req,res){
      db.query('select * from `users` where id = ' +'"'+req.body.userId+'"' ,function (err, dbresult){
    if (err){
        res.status(400)
        res.send(err);
    }else{
        console.log(req.body.old_password,dbresult[0].hash)
        bcrypt.compare(req.body.old_password,dbresult[0].hash)
        .then(result=>{
            console.log(result)
            if(!result){
                res.status(400)
                res.send("error wrong old password")
            }else{
                bcrypt.hash(req.body.password,10).then(hashedPassword=>{
                    db.query("update `users` set hash='"+hashedPassword +"' where userName='"+req.body.userName+"'",
                    function(err,result){
                        if(err){
                            res.status(400)
                            res.send(err)
                        }
                        else{
                            res.send(result)
                        }
                    })
                })
            }
        })
    }
});
});
module.exports= router;