const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../Router/requestsModiy');
const db2 = require('../dataBase/dataBaseConnection');
router.get('/getById',function(req,res){
    var modify = new modifyFunction();
    modify.getAppointment(req.body).then(result =>{
        res.send(result);
    });

})
router.post('/addApointment', async function(req,res){
    var modify = new modifyFunction();
    var s =  parseInt(req.body.duration);
    var a =  req.body.startTime.split(':');
    var hour = parseInt(a[0]);
    // console.log(hour + "hour"+ min );
    var min = parseInt(a[1]);
    console.log(min);
    while(true){

    if(min+s>60){
        hour+=1;
        s-=60;  
    }else{
        min +=s;
        break;
    } 
        }
        var endtime = hour +':'+min+':00';
        console.log("asdsa"+endtime);
    var a = await modify.addAppointment(req.body,endtime).then(result=>{
        res.send(result);
    })
})

module.exports = router;
