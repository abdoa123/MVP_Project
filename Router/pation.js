const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');

router.post('/addpt', async function(req,res){
    var result=JSON.stringify(req.body);  
    var json =  JSON.parse(result);  
   // console.log('asds',json.Problem);
   console.log(json.familyHistory[0].problem);
});

module.exports = router;