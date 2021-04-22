const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('./requestForOrder');
var db = require("../dataBase/dataBaseConnection");

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

router.get('/getAll',async function(req,res){
    console.log("yyyyyyyyyyeeeeeeessss  ");
    // let  table = `labOrder`;
    var sql = "SELECT * from `labOrder` " ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

router.post('/getOrderByPtId',async function(req,res){
    console.log("ptID: ", req.body.ptId , "   ", req.body.type);

    var modify = new modifyFunction();
    modify.getOrder(req.body.ptId,req.body.type).then(result=>{
        if(result){
            res.send(result);
        }else{
            console.log(result);
            res.send(result);
        }
    })
  });

  router.put('/updateOrder',async function(req,res){
      console.log("update Order: " , req.body);
      let table = `labOrder`;
      var modify = new modifyFunction();
      modify.updateOrder(req.body,table).then(result=>{
          if(result){
              res.send("order updated done");
          }else{
              console.log("error",result);
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
