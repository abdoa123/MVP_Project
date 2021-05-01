const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");
const modifyFunction = require('./requestsModiy');

router.post('/addSession', async function (req, res) {
    let startDate = new Date();

    var dt1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1, startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());
    var dt2 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());

    dt1 = dt1.toISOString().slice(0, 19).replace('T', ' ');
    dt2 = dt2.toISOString().slice(0, 19).replace('T', ' ');

    let a = db.query('INSERT INTO `sessions` (ptId, userId, startDate,endDate) VALUES  (' + req.body.ptId +
        ',' + req.body.userId + ',' + '"' + dt2 + '"' + ',' + '"' + dt1 + '"' + ')', function (err1, result2) {
            if (err1) {
                console.log(err1)
                res.send(err1)
            } else {

                res.send("1 record inserted")
            }

        });
});

router.post('/getSessionByDate', async function (req, res) {
    let date = new Date();
    var dt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

    dt = dt.toISOString().slice(0, 19).replace('T', ' ');
    // event_date > date_sub(now(), interval 1 week
    //+' and endDate <= '+'"'+dt+'"'
    var sql = "SELECT * from `sessions` where startDate <= " + '"' + dt + '" and endDate >= ' + '"' + dt + '"';
   db.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            
            if (result.length === 0)
                res.send(result);
            else {
                var modify = new modifyFunction();
                modify.getseesion(result).then(rfinal=>{
                    res.send(rfinal);
                                })
            }
        }
    });
});
  
/*
 

 */



module.exports = router;