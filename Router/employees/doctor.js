const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken") //Token module
const bcrypt = require("bcrypt");

const modifyFunction = require('../requestsModiy');
app.use(bodyParser);
const db = require('../../dataBase/dataBaseConnection');
var user = {
    tocken: "",
    userName: "",
    password: "",
}

router.post('/addDoctor', async function(req,res){
    await jwt.sign({ user: user }, 'secretkey', (err, token) => {
        user["tocken"] = token;
    });
    var newHash = await bcrypt.hash(req.body.password, 10);
    db.query("INSERT INTO `users` (userName, hash,Email, Token ) VALUES  ('" + req.body.userName + "'," + "'" + newHash + "'" + ",'" + req.body.Email + "'," + "'" + user["tocken"] + "'" + ");", function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {
            console.log(result2.insertId)
            db.query('INSERT INTO `doctor` (firstName, lastName,degree,address,phone, Date,userId) VALUES  (' +'"'+ req.body.firstName +'"'+ 
            ',' +'"'+ req.body.lastName +'"' +
            ',' +'"'+ req.body.degree+'"' +','+ '"'+req.body.Address + '"'+',' + req.body.phone +',"'+req.body.Date+'"'+','+parseInt(result2.insertId)+')', function (err1, result1) {
           if (err1) {
               console.log(err1)
           } else {
                db.query('insert into `permissiopn` (userId,roleId) VALUES  (' +result2.insertId+','+ 8+')',function (err3, result1) {
                    if(err3){
                        console.log(err3)
                        res.send(err3)
                    }else{
                    res.send("1 record inserted");
                    }
                })
           }
        });

            }

   });
});

router.post('/getDoctor',async function(req,res){
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
