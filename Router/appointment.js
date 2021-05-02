const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../Router/requestsModiy');
const db = require('../dataBase/dataBaseConnection');


router.post('/getAppointment', function (req, res) {
    var modify = new modifyFunction();
    modify.getAppointment(req.body).then(result => {
        res.send(result);
    });

})
router.post('/getById', async function (req, res) {
    db.query('select * FROM  `appoinment` where id = ' + +req.body.id, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result)
            res.send(result);
        }
    })
});

router.post('/getpation', async function (req, res) {
    console.log('jhjkh',req.body.ptId);
    db.query('select * FROM  `appoinment` where ptId = ' + +req.body.ptId, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result)
            res.send(result);
        }
    })
});

router.put('/updateAppointment', async function (req, res) {
    console.log(req.body.appId)
    db.query('UPDATE `appoinment` SET patientName = ' + '"' + req.body.patientName + '"' + ', reason = ' + '"' + req.body.reason + '"' + ', startDate = "' + req.body.startDate + '", endDate = "' + req.body.endDate + ' "' + ', '+req.body.check+ '=' + req.body.id + ', date =' + '"' + req.body.date + '"'
        + ' where id = ' + req.body.appId, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log(result);
                res.send("1 row update successfully");
            }
        })
})
router.post('/addApointment', async function (req, res) {
    var split = req.body.patientName.split(' ')
    var firstName = split[0];
    var secondName = split[1];
    var lastName = split[2];
    console.log(firstName);
    var modify = new modifyFunction();
    var ptId = await modify.getPtId(firstName, lastName, secondName);
    if(ptId.length ===0){
        res.send("pationtName is not Exist");
    }else{
    var id = ptId[0]["id"]
    console.log(ptId[0]);
    console.log(ptId[0]["id"]);
    var s = parseInt(req.body.duration);
    var a = req.body.startTime.split(':');
    var hour = parseInt(a[0]);
    // console.log(hour + "hour"+ min );
    var min = parseInt(a[1]);
    console.log(min);
    while (true) {

        if (min + s > 60) {
            hour += 1;
            s -= 60;
        } else {
            min += s;
            break;
        }
    }
    var endtime = hour + ':' + min + ':00';
    console.log("asdsa" + endtime);
    var a = await modify.addAppointment(req.body, endtime, id).then(result => {
        res.send(result);
    })
}
})
router.delete('/deleteAppoinment', async function (req, res) {
    db.query('DELETE  FROM `appoinment` where id = ' + req.body.id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("1 row delete successfully");
        }
    })
});

module.exports = router;