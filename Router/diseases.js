const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");


//get user permission by userId
router.get('/getDiseases',function(req,res){
    var sql = "SELECT * from `diseases` where ID = " + req.body.ID ;
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
    db.query('UPDATE `diseases` SET code = '+req.body.code+', name = ' + req.body.name+', abbreviation = ' + req.body.abbreviation+' where ID = ' + req.body.ID,function(err,result){
        if(err){
            console.log(err);
           res.send(err);
        }
        else{
            console.log(result);
            res.send(result);
        }
    } )
});
router.delete('/deleteDiseases',async function(req,res){
    db.query('DELETE  FROM `diseases` where ID = ' + req.body.ID,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});

module.exports = router;