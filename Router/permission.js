const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");


//get user permission by userId
router.get('/userpermission',function(req,res){
    console.log("test")
    var sql = "SELECT roleName from `roleRelation` a JOIN `roles` r on a.roleId = r.id where userId = " + req.body.userId ;
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err)       
        }
        else{
            if(result.length===0){
                res.json({message : "user has no permission"});
            }else{

                res.send(result);
            }
        }
    });
});

//get list of  user permission by roleId
router.get('/rolepermission',function(req,res){
    var sql = "SELECT Token from `roleRelation` a JOIN `users` u on a.userId = u.id where roleId = " + req.body.roleId ;
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err)       
        }
        else{
            if(result.length===0){
                res.json({message : "user has no permission"});
            }else{

                res.send(result);
            }
        }
    });
});

module.exports = router;