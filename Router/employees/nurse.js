const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../requestsModiy');
jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const db = require('../../dataBase/dataBaseConnection');
/*
 id:-1,
            date: this.getDate(),
            time: "4:23",
            temp:this.state.temp,
            pulse: this.state.pulse,
            bloodPressure: this.state.bloodPressure,
            respiratoryRate: this.state.respiratoryRate ,
            OXSat: this.state.oxygenSaturation,
            height: this.state.height,
            weight: this.state.weight,
            BMI: this.state.BMI,
            pain: this.state.pain,
            smokingStatus: this.state.smokingStatus,
            headC: this.state.headCircumference,
            pId:1
 */
            var user = {
                tocken: "",
                userName: "",
                password: "",
            }
router.post('/addNurse', async function(req,res){
    console.log("body : " , req.body);
    await jwt.sign({ user: user }, 'secretkey', (err, token) => {
        user["tocken"] = token;
    });
    var newHash = await bcrypt.hash(req.body.password, 10);
    db.query("INSERT INTO `users` (userName, hash,Email, Token ) VALUES  ('" + req.body.userName + "'," + "'" + newHash + "'" + ",'" + req.body.Email + "'," + "'" + user["tocken"] + "'" + ");", function (err1, result2) {
        if (err1) {
            console.log(err1)
        } else {
            console.log(result2.insertId)
            db.query('INSERT INTO `nurse` (firstName, lastName,degree,address,phone, Date,userId) VALUES  (' +'"'+ req.body.firstName +'"'+ 
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

router.post('/add', async function(req,res){
    let a = db.query('INSERT INTO `NurseModule` (temp, pulse, bloodPressure,respiratoryRate,OXSat,height,weight,BMI,pain,smokingStatus,headC,time,date,pId) VALUES  (' +'"'+ req.body.temp +'"'+ 
        ',' +'"'+ req.body.pulse +'"' +','+'"'+ req.body.bloodPressure + '"'+ ',' +'"'+ req.body.respiratoryRate +'"' +','+'"'+ req.body.OXSat + '"'+ ',' +'"'+ req.body.height +'"' +','+'"'+ req.body.weight + '"'+
        ',' +'"'+ req.body.BMI+'"' +','+ '"'+req.body.pain + '"'+',' + req.body.smokingStatus +','+'"'+ req.body.headC +'"'+ ','+'"'+req.body.time +'"'+','+'"'+req.body.date+'"'+', '+""+req.body.pId+')', function (err1, result2) {
       if (err1) {
           console.log(err1)
       } else {

           res.send("1 record inserted")
       }

   });
});

router.post('/getByDate',async function(req,res){
    var sql = "SELECT * from `NurseModule` where date = " + req.body.date ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

  router.post('/getByPId',async function(req,res){
    var sql = "SELECT * from `NurseModule` where pId = " + req.body.pId ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

router.get('/getNurse',async function(req,res){
    var sql = "SELECT * from `nurse` where id = " + req.body.id ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

  router.delete('/delete',async function(req,res){
    db.query('DELETE  FROM `NurseModule` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
    
  })

  router.get('/getAll',async function(req,res){
    var sql = "SELECT * from `nurse`" ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });
  router.put('/updateNurse',async function(req,res){
    let table = `nurse`;
    var modify = new modifyFunction();
    modify.updateEmployee(req,table).then(result=>{
        if(result){
            res.send("done");
        }else{
            res.send("err");
        }
    })

})

  router.delete('/deleteNurse',async function(req,res){
    db.query('DELETE  FROM `nurse` where id = ' + req.body.id,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
    
  })


module.exports = router;
