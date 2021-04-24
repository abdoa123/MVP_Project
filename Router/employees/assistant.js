const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../requestsModiy');
app.use(bodyParser);
const db = require('../../dataBase/dataBaseConnection');


router.post('/addAssistant', async function(req,res){
    let a = db.query('INSERT INTO `assistant` (firstName, lastName, Email,degree,address,phone,userName,password , Date) VALUES  (' +'"'+ req.body.firstName +'"'+ 
    ',' +'"'+ req.body.lastName +'"' +','+'"'+ req.body.Email + '"'+
    ',' +'"'+ req.body.degree+'"' +','+ '"'+req.body.address + '"'+',' + req.body.phone +','+'"'+ req.body.userName +'"'+ ','+'"'+req.body.password +'"'+','+'"'+req.body.Date+'"'+')', function (err1, result2) {
       if (err1) {
           console.log(err1)
       } else {

           res.send("1 record inserted")
       }

   });
});

router.get('/getAll',async function(req,res){
    var sql = "SELECT * from `assistant` "  ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

router.post('/getAssistant',async function(req,res){
    // console.log("id: " ,req.params.id);
    var sql = "SELECT * from `assistant` where id = " + req.body.id ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
            console.log("resp: " , result);
           res.send(result);
        }
    });
  });

  router.put('/updateAssistant',async function(req,res){
      let table = `assistant`;
      var modify = new modifyFunction();
      modify.updateEmployee(req,table).then(result=>{
          if(result){
              res.send('done');
          }else{
              res.send("err");
          }
      })

  })

  router.delete('/deleteAssistant',async function(req,res){
    db.query('DELETE  FROM `assistant` where id     = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
    
  })


module.exports = router;
