const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('./requestForOrder');

router.post('/addOrder', async function(req,res){
     let  table = `labOrder`;
     var modify = new modifyFunction();
     modify.addOrder(req.body,table).then(result=>{
        
        if(result){
            res.send("1 record added")
       }else{
           res.send("error in add order")
       }
     }).catch(err=>{
         res.send(err);
     })
});

router.post('/getOrderByPtId',async function(req,res){

    var modify = new modifyFunction();
    modify.getOrder(req.body.ptId,req.body.type).then(result=>{
        res.send(result);
    })
  });

  router.put('/updateOrder',async function(req,res){
      let table = `labOrder`;
      var modify = new modifyFunction();
      modify.updatePerson(req.body,table).then(result=>{
          if(result){
              res.send("order updated done");
          }else{
              res.send(result);
          }
      })

  })

  router.delete('/deleteOrder',async function(req,res){
    let table = `labOrder`;
    var modify = new modifyFunction();
    modify.deleteOrder(req.body,table).then(result=>{
        if(result){
            res.send("order deleted done");
        }else{
            res.send(result);
        }
    })
  })


module.exports = router;
