const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');

router.post('/addpt', async function (req, res) {
   var result = JSON.stringify(req.body);
   var json = JSON.parse(result);
   db.query('INSERT INTO ' + '`Patient`' + '(phone,address,	email,birthDate,maritalStatus,bloodGroup,firstName,lastName) VALUES(' + '"' + json.phone + '"' + ',' + '"' + json.address + '"' + ',' + '"' + json.email + '"' + ',' + '"' + json.birthDate + '"' + ',' +
      '"' + json.status + '"' + ',' + '"' + json.BloodGroup + '"' + ',' + '"' + json.firstName + '"' + ',' + '"' + json.lastName + '"' + ');', function (err, result) {
         if (err) {
            console.log("err=>>" + err);
            res.send(err);
         } else {
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
});

module.exports = router;