const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const reqModify = require('../Router/requestsModiy');
app.use(bodyParser);
router.post('/',async function(req,res){
    var modified=new reqModify();
        let  table = `doctorFrontDisk`;
    let added =   modified.addPerson(req.body.phone,req.body.address, req.body.establishment,req.body.contactperson,req.body.userId,table);
    console.log(added);
    res.send(added);
});

module.exports = router;

 