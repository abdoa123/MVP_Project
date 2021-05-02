
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../../dataBase/dataBaseConnection');
const modifyFunction = require('../requestsModiy');


router.post('/addChemist', async function(req,res){
    await jwt.sign({ user: user }, 'secretkey', (err, token) => {
        user["tocken"] = token;
    });
    var newHash = await bcrypt.hash(req.body.password, 10);
    db.query("INSERT INTO `users` (userName, hash,Email, Token ) VALUES  ('" + req.body.userName + "'," + "'" + newHash + "'" + ",'" + req.body.Email + "'," + "'" + user["tocken"] + "'" + ");", function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {
            console.log(result2.insertId)
            db.query('INSERT INTO `chemist` (firstName, lastName,degree,address,phone, Date,userId) VALUES  (' +'"'+ req.body.firstName +'"'+ 
            ',' +'"'+ req.body.lastName +'"' +
            ',' +'"'+ req.body.degree+'"' +','+ '"'+req.body.Address + '"'+',' + req.body.phone +',"'+req.body.Date+'"'+','+parseInt(result2.insertId)+')', function (err1, result1) {
           if (err1) {
               console.log(err1)
           } else {
                db.query('insert into `permissiopn` (userId,roleId) VALUES  (' +result2.insertId+','+ 7+')',function (err3, result1) {
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
