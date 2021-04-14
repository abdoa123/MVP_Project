const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");


//get user permission by userId
router.get('/getEmployee',function(req,res){
    var sql = "SELECT * from `employee` where ID = " + req.body.ID ;
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
router.post('/addEmployee',async function(req,res){
  
    let a = db.query('INSERT INTO `employee` (firstName, lastName, middleName,birthDate,degree,address,phone,type,userId) VALUES  (' + req.body.firstName + 
     ',' + req.body.lastName +','+ req.body.middleName  +','+  req.body.birthDate + 
     ',' + req.body.degree +','+ req.body.address + ',' + req.body.phone +','+ req.body.type + ','+ req.body.userId +')', function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {

            res.send("1 record inserted")
        }

    });
    });
router.put('/updateEmployee',function(req,res){
    db.query('UPDATE `employee` SET firstName = '+req.body.firstName+', lastName = ' + req.body.lastName+', middleName = '
     + req.body.middleName +', degree = ' + req.body.degree+', birthDate = '
     + req.body.birthDate +', address = ' + req.body.address+', phone = '
     + req.body.phone +', type = ' + req.body.type + ' where ID = ' + req.body.ID,function(err,result){
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
router.delete('/deleteEmployee',async function(req,res){
    db.query('DELETE  FROM `employee` where ID = ' + req.body.ID,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});

module.exports = router;