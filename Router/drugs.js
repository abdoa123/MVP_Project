const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");


//get user permission by userId
router.post('/getById',function(req,res){
    var sql = "SELECT * from `drugs` where id = " + req.body.id ;
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
    var sql = "SELECT * from `drugs` " ;
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
router.post('/addDrug',async function(req,res){
  
    let a = db.query('INSERT INTO `drugs` (genricName, tradeName, form, dose, family ) VALUES  (' +'"'+req.body.genricName+'"'+  ',' + '"'+ req.body.tradeName +'"'+','+'"'+req.body.form+'"' +  ',' + '"'+ req.body.dose + '"'+','+'"'+req.body.family+ '"' + ')', function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {

            res.send("1 record inserted")
        }

    });
    });
router.put('/updateDrug',function(req,res){
    db.query('UPDATE `drugs` SET genricName = '+'"'+req.body.genricName+'"'+', tradeName = ' +'"'+ req.body.tradeName+'"'+', form = "'+req.body.form+'", dose = "'+req.body.dose+' "' + ', family = "'+ req.body.family+'" where id = ' + req.body.id,function(err,result){
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
router.delete('/deleteDrug',async function(req,res){
    db.query('DELETE  FROM `drugs` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send("1 row delete successfully");
        }
    })
});

module.exports = router;