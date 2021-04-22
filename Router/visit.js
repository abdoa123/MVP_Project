const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");

router.post('/addvisit', async function(req,res){
    var result = JSON.stringify(req.body);
    var json = JSON.parse(result);
    console.log('asd',json.DD[0].id);
    let dease ="";
    let labsChoices ="";
    let radioChoices ="";
    let pathologyChoices ="";
    console.log(json.DD[0].code)
    for(var i=0;i<json.DD.length;i++){
        if(i==0){
            dease+='{'
        }
        dease += '"'+(json.DD[i].id)+'",'; 
    }
    dease+='}'
    for(var i=0;i<json.labsChoices.length;i++){
        if(i==0){
            labsChoices+='{'
        }
        labsChoices += '"'+json.labsChoices[i].id+'",'; 
        
    }
    labsChoices+='}';
    for(var i=0;i<json.radioChoices.length;i++){
        if(i==0){
            radioChoices+='{'
        }
        radioChoices +='"'+json.radioChoices[i].id+'",'; 
    }
    radioChoices+='}'
    for(var i=0;i<json.pathologyChoices.length;i++){
        if(i==0){
            pathologyChoices+='{'
        }
        pathologyChoices +='"'+json.pathologyChoices[i].id+'",'; 
    }
    pathologyChoices+='}'
        let a = db.query('INSERT INTO `visit` (chiefComplains, diagnosis, investigation,deasesId,labId,pathologyId,radioId) VALUES  (' +'"'+json.chiefComplains+'",' + 
         +'"'+ json.diagnosis +'"'+','+'"'+	json.surgeries +'"'+','+'"'+json.investigation +'"'+','+ '"'+dease+'",'
        +'"'+ labsChoices+'"'+','+'"'+pathologyChoices+'"'+','+'"'+radioChoices+'"'+')', function (err1, result2) {
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