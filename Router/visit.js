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
    console.log("ptid:  ", req.body)
    var modify = new modifyFunction();
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
    let test = true;
    for (var i = 0; i < json.labsChoices.length; i++) {
        modify.addOrder(json.labsChoices[i], table1).then(result => {

            if (result) {
               test = true;
            } else {
                res.send("error in add order")
                test = false;
            }
        })
        if(!test){
            break;
        }
    }
    for (var i = 0; i < json.radioChoices.length; i++) {
        modify.addOrder(json.radioChoices[i], table).then(result => {

            if (result) {
                test = true;
            } else {
                res.send("error in add  radio ")
            }
        })

    }
    for (var i = 0; i < json.pathologyChoices.length; i++) {
        modify.addOrder(json.pathologyChoices[i], table2).then(result => {

            if (result) {
                test = true;
            } else {
                res.send("error in add pathology")
            }
        })

    }

    let a = db.query('INSERT INTO `visit` (chiefComplains,interventions, diagnosis,surgeries,deasesId,surgeryDate,interventionDate,ptId,drId) VALUES  ('
        + '"' + json.chiefComplains + '"' + ',"' + json.interventions + ' "' + ',' + '"' + json.diagnosis + '"' + ' ,' + '"' + json.surgeries + '"'  + ',' + '"' + dease + '",'
        + '"' + json.surgeryDate + '"' + ',' + '"' + json.interventionDate + '"' +','+req.body.ptId+','+ req.body.drId+ ')', function (err1, result2) {
            if (err1) {
                console.log(err1)
            } else {
                var id = result2.insertId;
                console.log("id : " , id);
                res.send({id});
            }

        });
});

router.post('/addPrescription',function(req,res,next){
    db.query("Insert Into `Prescription`(notes,visit_id) Values('"+req.body.notes+"','"+req.body.visit_id+"')",function(err,result){
        if(err){
            res.status(400);
            
            res.send(err)
        }else{
            res.send(result.insertId)
        }
    })
})
router.post('/addPrescription_Drugs',function(req,res,next){
    db.query("Insert Into `Prescription`(notes,visit_id) Values('"+req.body.notes+"','"+req.body.visit_id+"')",function(err,dbresult){
        if(err){
            res.status(400);
            console.log("errrrrrrrrorrrr   ",err);
            res.send(err)
        }else{
            console.log(req.body.data)
            req.body.data.forEach((item,index)=>{
                console.log(item)
                db.query("Insert Into `Prescription_Drugs`(Quantity,Duration,drug_id,prescription_id) Values('"+item.Quantity+"','"+item.Duration+"','"+item.drug_id+"','"+dbresult.insertId+"')",function(err,result){
                    if(err){
                       console.log(err)
                    }
                    else{
                        console.log("added")
                    }
                })
            })
            res.send("Added Successfully")
        }
    })
})
router.get('Prescription/:P_id',function(req,res){
    db.query("SELECT D.genricName , D.tradeName, PD.Quantity,PD.Duration FROM Prescription_Drugs as PD JOIN drugs as D on PD.drug_id = D.id WHERE PD.prescription_id="+req.params.P_id,function(err,result){
        if(err){
            res.status(400)
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
router.get('DrugsByVisit/:P_id',function(req,res){
    db.query("SELECT D.genricName , D.tradeName, PD.Quantity,PD.Duration FROM Prescription P JOIN Prescription_Drugs as PD JOIN drugs as D on PD.drug_id = D.id WHERE P.visit_id"+req.params.P_id,function(err,result){
        if(err){
            res.status(400)
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

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