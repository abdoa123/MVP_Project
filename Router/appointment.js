const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const modifyFunction = require('../Router/requestsModiy');
const db2 = require('../dataBase/dataBaseConnection');

router.get('/getAllApointment', async function(req,res){
    var modify = new modifyFunction();
    modify.addAppointment(req.body).then(result=>{
        res.send(result);
    })
})

module.exports = router;
