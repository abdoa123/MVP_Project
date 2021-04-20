const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');

router.post('/addpt', async function(req,res){
    var result=JSON.stringify(req.body);  
    var json =  JSON.parse(result);  
   console.log(json.familyHistory[0].problem);
   db.query('INSERT INTO ' + '`Patient`'+  '(phone,address,	email,birthDate,maritalStatus,bloodGroup,firstName,lastName) VALUES('+'"'+json.phone+'"'+','+'"'+json.address+'"'+','+'"'+json.email+'"'+','+'"'+json.birthDate+'"'+','+
   '"'+json.status+'"'+','+'"'+ json.BloodGroup +'"' + ',' +'"'+ json.firstName +'"' +','+ '"'+json.lastName +'"'+');', function (err, result) {
   if (err) {
   console.log("err=>>" + err);
   res.send(err);
   }else{
      console.log(result[0]["id"])
      for(var i =0;i<json.Allergy.length;i++){
         db.query('INSERT INTO ' + '`pt_allergy`'+  '(type,reaction,	notes,ptid) VALUES('+'"'+json.Allergy[i].type+'"'+','+'"'+json.Allergy[i].reaction+'"'+','+'"'+json.Allergy[i].notes+'"'+1+');', function (err, result) {
   if (err) {
      res.send(err); 
   }else{
      res.send("done")
   }
      })
   }

   }
        })
});

module.exports = router;