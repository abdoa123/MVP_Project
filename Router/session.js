const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");

router.post('/addSession', async function(req,res){
    let startDate= new Date();
    var dt1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1,startDate.getHours(),startDate.getMinutes(),startDate.getSeconds());

        let a = db.query('INSERT INTO `sessions` (ptId, userId, startDate,endDate) VALUES  (' +req.body.ptId + 
        ',' + req.body.userId +','+'"'+startDate +'"'+','+'"'+dt1 +'"'+')', function (err1, result2) {
       if (err1) {
           console.log(err1)
       } else {

           res.send("1 record inserted")
       }

   });
});

router.post('/getSessionByDate',async function(req,res){
    var sql = "SELECT * from `sessions` where startDate >= " + req.body.date  +'and endDate <= '+req.body.date;
    db.query(sql, function (err, result) {
        if (err) {
            res.send(err); 
        }
        else{
           res.send(result);
        }
    });
  });





module.exports = router;