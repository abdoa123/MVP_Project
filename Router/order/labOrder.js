const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../requestForOrder');
var db = require("../../dataBase/dataBaseConnection");
const multer = require('multer')

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

router.post('/getOrdersByLabId',async function(req,res){
    var sql = "SELECT * from `labOrder` where labId = "+req.body.labId ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });
  router.post('/getOrdersByLabFdId',async function(req,res){
    var sql = "SELECT * from `labOrder` where LfDId = "+req.body.LfDId ;
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
  
var pdf = ''
  router.put('/updateOrder',
    multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/labs"));
      },
      filename: (req, file, cb) => {
          pdf = Date.now() + "-" + file.originalname
        cb(null, pdf);
      },
    }),
  }).single("result")
  ,async function(req,res){
      console.log("update Order: " , req.body);
      let table = `labOrder`;
      var modify = new modifyFunction();
      req.body['result'] = pdf
      modify.updateOrder(req.body,table).then(result=>{
          if(result){
              res.send("order updated done");
          }else{
              console.log("error",result);
              res.send(result);
          }
      })

  })

router.put('/setAccept',function(req,res){  
        console.log("res:   " , req.body.labFdId);    
    var result = JSON.stringify(req.body.acceptedIds);
    var json = JSON.parse(result);
    console.log('asd',result);
    var result1 = result.split(',')
    for(var i =0;i<req.body.acceptedIds.length;i++){
        console.log(req.body.acceptedIds[i]);
        if(req.body.acceptedIds[i]==',')
            continue;
        //console.log("asdsaasd",parseInt(result1[i]));
        db.query('UPDATE `labOrder` SET LfDId = '+req.body.labFdId+', labId ='+req.body.labId+' where id = ' + req.body.acceptedIds[i],function(err,result){
            if(err){
                console.log(err);
               res.send(err);
            }
        })
    }
    res.send("done");
});

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
