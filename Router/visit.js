const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");

router.post('/addvisit', async function(req,res){
    console.log("ress:    " , req.body);
    var result = JSON.stringify(req.body);
    var json = JSON.parse(result);
    let dease ="";
    let labsChoices ="";
    let radioChoices ="";
    let pathologyChoices ="";
    for(var i=0;i<json.DD.length;i++){
        dease +="," +json.DD[i]; 
    }
    for(var i=0;i<json.labsChoices.length;i++){
        labsChoices +="," +json.labsChoices[i]; 
        
    }
    console.log('DD' , json.DD);
    console.log('lab' , labsChoices);
    for(var i=0;i<json.radioChoices.length;i++){
        radioChoices +="," +json.radioChoices[i]; 
    }
    for(var i=0;i<json.pathologyChoices.length;i++){
        pathologyChoices +="," +json.pathologyChoices[i]; 
    }
        let a = db.query('INSERT INTO `visit` (chiefComplains, diagnosis, investigation,deasesId,labId,pathologyId,radioId) VALUES  (' +'"'+json.chiefComplains+'"' + 
        ',' +'"'+ json.diagnosis +'"'+','+'"'+	json.surgeries +'"'+','+'"'+json.investigation +'"'+', "'+ dease+'"'+', "'
        + labsChoices+'"'+', "'+pathologyChoices+'"'+',"'+radioChoices+'"'+')', function (err1, result2) {
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