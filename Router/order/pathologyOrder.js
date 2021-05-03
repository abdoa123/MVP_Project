const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../requestForOrder');
var db = require("../../dataBase/dataBaseConnection");
const multer = require('multer')

app.use(bodyParser);

router.post('/addOrder', async function(req,res){
     let  table = `pathologyOrder`;
     var modify = new modifyFunction();
     modify.addOrder(req.body,table).then(result=>{
        
        if(result){
            res.send("1 record added")
            console.log(result)
       }else{
           console.log(err)
           res.send("error in add order")
       }
     }).catch(err=>{
         res.send(err);
     })
});

router.post('/getOrderById',async function(req,res){
    let  table = `pathologyOrder`;
    var modify = new modifyFunction();
    modify.getOrder(req.body.id,table).then(result=>{
        res.send(result);
    })
  });

  router.post('/getOrdersBypathologyId',async function(req,res){

    var sql = "SELECT * from `pathologyOrder` where pathologyId = "+req.body.pathologyId ;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });

  var pdf = ''

  router.put('/updateOrder',
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/pathelogys"));
      },
      filename: (req, file, cb) => {
          pdf = Date.now() + "-" + file.originalname
        cb(null, pdf);
      },
    }),
  }).single("result")
  ,
  async function(req,res){
      let table = `pathologyOrder`;
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

router.put('/setAccept',async function(req,res){  
    console.log("res:   " , req.body.acceptedIds[2]);    
var result = JSON.stringify(req.body.acceptedIds);
var json = JSON.parse(result);
console.log('asd',result);
var result1 = result.split(',')
for(var j =0;j<req.body.acceptedIds.length;j++){
    console.log(j +" > "+ req.body.acceptedIds.length);
    if(req.body.acceptedIds[j]==',')
    {
        continue;
    }
    //console.log("asdsaasd",parseInt(result1[i]));
    db.query('UPDATE `pathologyOrder` SET pfDId = '+req.body.pfDId+', pathologyId = ' +req.body.pathologyId+' where id = ' + req.body.acceptedIds[j],function(err,result){
        if(err){
            console.log(err);
           res.send(err);
        }
    })
}
res.send("done");
});
  router.delete('/deleteOrder',async function(req,res){
    let table = `pathologyOrder`;
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
