const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");
const modifyFunction = require('./requestForOrder');

/*
        chiefComplains : chiefComplains,
          diagnosis : diagnosis,
          surgeries : surgeries,
          surgeryDate : surgeryDate,
          interventions :interventions,
          interventionDate :interventionDate, */
router.post('/addvisit', async function (req, res) {
    var modify = new modifyFunction();
    let dease = "";
    let table = `RadioOrder`;
    let table1 = `labOrder`;
    let table2 = `pathologyOrder`;
    var result = JSON.stringify(req.body);
    var json = JSON.parse(result);
    let dease = "";

    for (var i = 0; i < json.DD.length; i++) {
        if (i == 0) {
            dease += '{'
        }
        dease += (json.DD[i].id) + ',';
    }
    dease += '}'

    for (var i = 0; i < json.labsChoices.length; i++) {
        modify.addOrder(json.labsChoices[i], table1).then(result => {

            if (result) {
                continue;
            } else {
                sres.send("error in add order")
            }
        })

    }
    for (var i = 0; i < json.radioChoices.length; i++) {
        modify.addOrder(json.radioChoices[i], table).then(result => {

            if (result) {
                continue;
            } else {
                sres.send("error in add  radio ")
            }
        })

    }
    for (var i = 0; i < json.pathologyChoices.length; i++) {
        modify.addOrder(json.pathologyChoices[i], table2).then(result => {

            if (result) {
                continue;
            } else {
                sres.send("error in add pathology")
            }
        })

    }

    let a = db.query('INSERT INTO `visit` (chiefComplains,interventions, diagnosis,surgeries,deasesId,surgeryDate,interventionDate) VALUES  ('
        + '"' + json.chiefComplains + '"' + ',"' + json.interventions + ' "' + ',' + '"' + json.diagnosis + '"' + ' ,' + '"' + json.surgeries + '"'  + ',' + '"' + dease + '",'
        + '"' + json.surgeryDate + '"' + ',' + '"' + json.interventionDate + '"' + ')', function (err1, result2) {
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