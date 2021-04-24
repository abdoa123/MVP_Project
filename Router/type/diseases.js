const express = require('express');
const router = express.Router();
var db = require("../../dataBase/dataBaseConnection");


//get user permission by userId
router.post('/getById',function(req,res){
    var sql = "SELECT * from `diseases` where id = " + req.body.id ;
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
    var sql = "SELECT * from `diseases` " ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
});

//get list of  user permission by roleId
router.post('/addDiseases',async function(req,res){
  
    let a = db.query('INSERT INTO `diseases` (code, name, abbreviation ) VALUES  (' + req.body.code +  ',' + req.body.name +','+ req.body.abbreviation  + ')', function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {

            res.send("1 record inserted")
        }

    });
    });
router.put('/updateDiseases',function(req,res){
    db.query('UPDATE `diseases` SET code = '+'"'+req.body.code+'"'+', name = ' +'"'+ req.body.name+'"'+', abbreviation = ' +'"'+ req.body.abbreviation+'"'+' where id = ' + req.body.id,function(err,result){
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
router.delete('/deleteDiseases',async function(req,res){
    db.query('DELETE  FROM `diseases` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send("1 row delete successfully");
        }
    })
});

module.exports = router;