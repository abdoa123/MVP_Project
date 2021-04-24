const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../requestsModiy');
app.use(bodyParser);

router.post('/addPerson', async function(req,res){
     let  table = `doctorFrontDisk`;
     var modify = new modifyFunction();
     modify.addPerson(req.body,table).then(result=>{
         console.log("result -" + result);
        if(result){
            console.log("****");
            res.send("1 record added")
       }else{
           console.log("123");
           res.send("error in add front disk")
       }
     }).catch(err=>{
         res.send(err);
     })
});

router.get('/getPerson',async function(req,res){
    let  table = `doctorFrontDisk`;
    var modify = new modifyFunction();
    modify.getPerson(req.body.id,table).then(result=>{
        res.send(result);
    })
  });

  router.put('/updatePerson',async function(req,res){
      let table = `doctorFrontDisk`;
      var modify = new modifyFunction();
      modify.updatePerson(req.body,table).then(result=>{
          if(result){
              res.send("Front disk updated done");
          }else{
              res.send("err");
          }
      })

  })

  router.delete('/deletePerson',async function(req,res){
    let table = `doctorFrontDisk`;
    var modify = new modifyFunction();
    modify.deletePerson(req.body,table).then(result=>{
        if(result){
            res.send("user deleted done");
        }else{
            res.send("err");
        }
    })
  })


module.exports = router;
