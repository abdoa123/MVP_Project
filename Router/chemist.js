
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');
const modifyFunction = require('../Router/requestsModiy');


router.post('/addChemist', async function(req,res){
    let a = db.query('INSERT INTO `chemist` (firstName, lastName, Email,degree,address,phone,userName,password , Date) VALUES  (' +'"'+ req.body.firstName +'"'+ 
    ',' +'"'+ req.body.lastName +'"' +','+'"'+ req.body.Email + '"'+
    ',' +'"'+ req.body.degree+'"' +','+ '"'+req.body.address + '"'+',' + '"'+req.body.phone +'"'+','+'"'+ req.body.userName +'"'+ ','+'"'+req.body.password +'"'+','+'"'+req.body.Date+'"'+')', function (err1, result2) {
       if (err1) {
           console.log(err1)    
       } else {

           res.send("1 record inserted")
       }

   });
});

router.post('/getChemist',async function(req,res){
    var sql = "SELECT * from `chemist` where id = " + req.body.id ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });router.get('/getAll',async function(req,res){
    var sql = "SELECT * from `chemist`"  ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

  router.put('/updateChemist',async function(req,res){
      let table = `chemist`;
      var modify = new modifyFunction();
      modify.updateEmployee(req,table).then(result=>{
          if(result){
              res.send(" updated done");
          }else{
              res.send("err");
          }
      })

  })

  router.delete('/deleteChemist',async function(req,res){
    db.query('DELETE  FROM `chemist` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
    
  })


module.exports = router;
