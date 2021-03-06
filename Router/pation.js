const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');

router.post('/addpt', async function (req, res) {
   var result = JSON.stringify(req.body);
   var json = JSON.parse(result);
   db.query('select * from `users` where Email= ' +'"'+json.email+'"',function(errr,resu){
   if(errr){
      console.log("errrrrrrrroororoororo",errr);
      res.send("error");
   }else{
      console.log("In elseeeeeee");
      console.log(resu[0]["id"])
      var userId = resu[0]["id"];
      console.log("ressssssssss",resu[0]["id"]);

      db.query('INSERT INTO ' + '`Patient`' + '(phone,address,birthDate,maritalStatus,bloodGroup,firstName,lastName,secondName,userId) VALUES(' + '"' + json.phone + '"' + ',' + '"' + json.address + '"' + ','   + '"' + json.birthDate + '"' + ',' +
      '"' + json.status + '"' + ',' + '"' + json.BloodGroup + '"' + ',' + '"' + json.firstName + '"' + ',' + '"' + json.lastName + '" ,'+'"'+json.secondName+'" ,' +parseInt(userId)+ ');', function (err, result) {
         if (err) {
            console.log("err=>>" + err);
            res.send(err);
         } else {
            console.log(result)
            for (var i = 0; i < json.Allergy.length; i++) {
               db.query('INSERT INTO ' + '`pt_allergy`' + '(type,reaction,notes,ptid) VALUES(' + '"' + json.Allergy[i].type + '"' + ',' + '"' + json.Allergy[i].reaction + '"' + ',' + '"' + json.Allergy[i].notes + '",' + result["insertId"] + ');', function (err, result2) {
                  if (err) {
                     console.log(err);
                     res.send(err);
                  }
               })
            }

            for (var i = 0; i < json.familyHistory.length; i++) {
               db.query('INSERT INTO ' + '`pt_familyHistory`' + '(relation,problem,date,notes,ptid) VALUES(' + '"' + json.familyHistory[i].relation + '"' + ',' + '"' + json.familyHistory[i].problem + '"' + ',' + '"' + json.familyHistory[i].date
                  + '",' + '"' + json.familyHistory[i].notes + '",' + result["insertId"] + ');', function (err, result2) {
                     if (err) {
                        console.log(err);
                        res.send(err);
                     }
                  })
            }
            for (var i = 0; i < json.surgeries.length; i++) {
               db.query('INSERT INTO ' + '`pt_surgery_history`' + '(name,date,notes,ptid) VALUES(' + '"' + json.surgeries[i].name + '"' + ',' + '"' + json.surgeries[i].date
                  + '",' + '"' + json.surgeries[i].notes + '",' + result["insertId"] + ');', function (err, result3) {
                     if (err) {
                        console.log(err);
                        res.send(err);
                     }
                  })
            }
            for (var i = 0; i < json.onGoingProblems.length; i++) {
               db.query('INSERT INTO ' + '`pt_problems`' + '(problem,date,treatingDr,status,ptid) VALUES(' + '"' + json.onGoingProblems[i].problem + '"' + ',' + '"' + json.onGoingProblems[i].date
                  + '",' + '"' + json.onGoingProblems[i].treatingDr + '",' + '"' + json.onGoingProblems[i].status + '"'+ ',' + result["insertId"] + ');', function (err, result3) {
                     if (err) {
                        console.log(err);
                        res.send(err);
                     }
                  })
            }
            for (var i = 0; i < json.Interventions.length; i++) {
               db.query('INSERT INTO ' + '`Interventions`' + '(name,date,notes,ptid) VALUES(' + '"' + json.Interventions[i].name + '"' + ',' + '"' + json.Interventions[i].date
                  + '",' + '"' + json.Interventions[i].notes + '",' + result["insertId"] + ');', function (err, result3) {
                     if (err) {
                        console.log(err);
                        res.send(err);
                     }
                  })
            }
            res.send("done");

         }
      })
   }   
   })
  
});

router.post('/getAllergyById',function(req,res){
   console.log('function Get Patient : ' , req.body.id);
   var sql = 'SELECT  *  FROM pt_allergy  where pt_allergy.ptId = '+req.body.id ;
   db.query(sql, function (err, result) {
       if (err) {
          
           res.send(err); 
       }
       else{
          res.send(result);
       }
   });
});
router.post('/getProblemsById',function(req,res){
   console.log('function Get Patient : ' , req.body.id);
   var sql = 'SELECT  *  FROM pt_problems  where pt_problems.ptId = '+req.body.id ;
   db.query(sql, function (err, result) {
       if (err) {
          
           res.send(err); 
       }
       else{
          res.send(result);
       }
   });
});
router.post('/getPtById',function(req,res){
   console.log('function Get Patient : ' , req.body.id);
   var sql = 'SELECT  *  FROM Patient  where Patient.id = '+req.body.id ;
   db.query(sql, function (err, result) {
       if (err) {
          
           res.send(err); 
       }
       else{
          res.send(result);
       }
   });
});



router.post('/getPtByuserId',function(req,res){
   console.log('function Get Patient : ' , req.body.id);
   var sql = 'SELECT  *  FROM Patient  where Patient.id = '+req.body.id ;
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
