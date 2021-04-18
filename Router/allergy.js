const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");


//get user permission by userId
router.get('/getAllergy',function(req,res){
    var sql = "SELECT * from `allergy` ";
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
});
router.post('/getById',function(req,res){
    console.log("kkkkkkkk",req.body.id);
    
    // db.query("SELECT * from `allergy` where id = ' + req.body.id , function (err, result) {
        db.query('SELECT * from `allergy` where id = ' + req.body.id,function(err,result){
        if (err) {
            res.send(err); 
        }
        else{
            
           res.send(result);
        }
    });
});

//get list of  user permission by roleId
router.post('/addAllergy',async function(req,res){
  
    let a = db.query('INSERT INTO `allergy` (name, description ) VALUES  (' +'"'+ req.body.name +'"'+  ',' +'"'+ req.body.description+ '"'+')', function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {

            res.send("1 record inserted")
        }

    });
    });
    
router.put('/updateAllergy',function(req,res){
    db.query('UPDATE `allergy` SET name = '+'"'+req.body.name+'"'+', description = ' +'"'+ req.body.description+'" where id = ' + req.body.id,function(err,result){
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

router.delete('/deleteAllergy',async function(req,res){
    console.log("deleeeeeete" , req.body.id);
    db.query('DELETE  FROM `allergy` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});

module.exports = router;