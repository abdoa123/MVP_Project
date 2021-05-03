const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../requestForOrder');
const db = require('../../dataBase/dataBaseConnection');
const multer = require('multer')

app.use(bodyParser);

router.post('/addOrder', async function(req,res){
     let  table = `RadioOrder`;
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

router.post('/getOrdersByRadioId',async function(req,res){
    var sql = "SELECT * from `RadioOrder` where radioId = "+req.body.radioId ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

router.post('/getOrderById',async function(req,res){
    let  table = `RadioOrder`;
    var modify = new modifyFunction();
    modify.getOrder(req.body.id,table).then(result=>{
        res.send(result);
    })
  });
var pdf = ''

  router.put('/updateOrder',
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/radios"));
      },
      filename: (req, file, cb) => {
          pdf = Date.now() + "-" + file.originalname
        cb(null, pdf);
      },
    }),
  }).single("result")
  ,async function(req,res){
      let table = `RadioOrder`;
      var modify = new modifyFunction();
      req.body['result'] = pdf
      modify.updateOrder(req.body,table).then(result=>{
          if(result){
              res.send("order updated done");
          }else{
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
    db.query('UPDATE `RadioOrder` SET rfDid = '+req.body.rfDid+', radioId ='+req.body.radioId+' where id = ' + req.body.acceptedIds[i],function(err,result){
        if(err){
            console.log(err);
           res.send(err);
        }
    })
}
res.send("done");
});


  router.delete('/deleteOrder',async function(req,res){
    let table = `RadioOrder`;
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
