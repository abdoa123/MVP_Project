const express = require('express');
const router = express.Router();
var db = require("../../dataBase/dataBaseConnection");
//patho
jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
//get user permission by userId


router.get('/getById',function(req,res){
    var sql = "SELECT * from `labs` where id = " + req.body.id ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
});

router.get('/getAll',function(req,res){
db.query('select * from `labs` ',function(err,result){
if(err){
    res.send(err);
}else{
    res.send(result);
}
});

})

//get list of  user permission by roleId
router.post('/addlab',async function(req,res){
  
    let a = db.query('INSERT INTO `labs` (abbreviation,name, description ) VALUES  (' +req.body.abbreviation+','+ req.body.name +  ',' + req.body.description +')', function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {

            res.send("1 record inserted")
        }

    });
    });
router.put('/updatedlab',function(req,res){
    db.query('UPDATE `labs` SET name = '+req.body.name+', description = ' + req.body.description+', abbreviation = ' + req.body.abbreviation+' where id = ' + req.body.id,function(err,result){
        if(err){
            console.log(err);
           res.send(err);
        }
        else{
            console.log(result);
            res.send("1 row update successfully");
        }
    } )
});
router.delete('/deletelab',async function(req,res){
    db.query('DELETE  FROM `labs` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send("1 row delete successfully");
        }
    })
});

module.exports = router;