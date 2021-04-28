const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../requestsModiy');
app.use(bodyParser);
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
router.post('/addNurse', async function(req,res){
    let a = db.query('INSERT INTO `nurse` (firstName, lastName, Email,degree,address,phone,userName,password , Date) VALUES  (' +'"'+ req.body.firstName +'"'+ 
        ',' +'"'+ req.body.lastName +'"' +','+'"'+ req.body.Email + '"'+
        ',' +'"'+ req.body.degree+'"' +','+ '"'+req.body.Address + '"'+',' + req.body.phone +','+'"'+ req.body.userName +'"'+ ','+'"'+req.body.password +'"'+','+'"'+req.body.Date+'"'+')', function (err1, result2) {
       if (err1) {
           console.log(err1)
       } else {

           res.send("1 record inserted")
       }

   });
});

router.post('/add', async function(req,res){
    let a = db.query('INSERT INTO `NurseModule` (temp, pulse, bloodPressure,respiratoryRate,respiratoryRate,OXSat,height,weight,BMI,pain,smokingStatus,headC,time,date,pId) VALUES  (' +'"'+ req.body.temp +'"'+ 
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
