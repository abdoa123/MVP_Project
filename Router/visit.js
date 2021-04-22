const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");

router.post('/addvisit', async function(req,res){
    var result = JSON.stringify(req.body);
    var json = JSON.parse(result);
        let a = db.query('INSERT INTO `visit` (chiefComplains, diagnosis, investigation,deasesId,labId,pathologyId,radioId) VALUES  (' +'"'+json.chiefComplains+'"' + 
        ',' +'"'+ json.diagnosis +'"'+','+'"'+	json.surgeries +'"'+','+'"'+json.investigation +'"'+', "'+ json.deasesId+'"'+', "'
        + json.labId+'"'+', "'+json.pathologyId+'"'+',"'+json.radioId+')', function (err1, result2) {
       if (err1) {
           console.log(err1)
       } else {
           res.send("1 record inserted")
       }

   });
});

// router.post('/getSessionById',async function(req,res){
//     var sql = "SELECT * from `doctor` where id = " + req.body.id ;
//     db.query(sql, function (err, result) {
//         if (err) {
//             res.send(err); 
//         }
//         else{
//            res.send(result);
//         }
//     });
//   });





module.exports = router;