const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser);
const db = require('../dataBase/dataBaseConnection');

router.post('/addpt', async function(req,res){
   console.log(req.body);
});