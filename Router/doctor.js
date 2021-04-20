const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../Router/requestsModiy');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');


router.post('/addDoctor', async function(req,res){
    // let a = db.query('INSERT INTO `doctor` (firstName, lastName, Email,degree,address,phone,userName,password) VALUES  (' + req.body.firstName + 
    // ',' + req.body.lastName +','+ req.body.Email  +
    // ',' + req.body.degree +','+ req.body.Address + ',' + req.body.Phone +','+ req.body.userName + ','+req.body.password +')', function (err1, result2) {
        let a = db.query('INSERT INTO `doctor` (firstName, lastName, Email,degree,address,phone,userName,password , Date) VALUES  (' +'"'+ req.body.firstName +'"'+ 
        ',' +'"'+ req.body.lastName +'"' +','+'"'+ req.body.Email + '"'+
        ',' +'"'+ req.body.degree+'"' +','+ '"'+req.body.Address + '"'+',' + req.body.phone +','+'"'+ req.body.userName +'"'+ ','+'"'+req.body.password +'"'+','+'"'+req.body.Date+'"'+')', function (err1, result2) {
       if (err1) {
           console.log(err1)
       } else {

           res.send("1 record inserted")
       }

   });
});

router.get('/getDoctor',async function(req,res){
    var sql = "SELECT * from `doctor` where id = " + req.body.id ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });
  router.get('/getAll',async function(req,res){
    var sql = "SELECT * from `doctor` " ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

  router.put('/updateDoctor',async function(req,res){
      let table = `doctor`;
      var modify = new modifyFunction();
      modify.updateEmployee(req,table).then(result=>{
          if(result){
              res.send("done");
          }else{
              res.send("err");
          }
      })

  })

  router.delete('/deleteDoctor',async function(req,res){
    db.query('DELETE  FROM `doctor` where id     = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
    
  })


module.exports = router;
