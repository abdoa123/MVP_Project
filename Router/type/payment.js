const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");


//get user permission by userId
router.get('/getById',function(req,res){
    var sql = "SELECT * from `payment` where id = " + req.body.id ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
});

router.get('/getPayment',function(req,res){
db.query('select * from `payment` ',function(err,result){
if(err){
    res.send(err);
}else{
    res.send(result);
}
});

})

//get list of  user permission by roleId
router.post('/addAllPayment',async function(req,res){
  
    let a = db.query('INSERT INTO `payment` (type, description ) VALUES  (' + req.body.type +  ',' + req.body.description +')', function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {

            res.send("1 record inserted")
        }

    });
    });
router.put('/updatePayment',function(req,res){
    db.query('UPDATE `payment` SET type = '+req.body.type+', description = ' + req.body.description+' where id = ' + req.body.id,function(err,result){
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
router.delete('/deletePayment',async function(req,res){
    db.query('DELETE  FROM `payment` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send("1 row Deleted successfully");
        }
    })
});

module.exports = router;