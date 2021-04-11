const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var db = require("../dataBase/dataBaseConnection");
app.use(bodyParser);
var user = {
    tocken: "",
    userName: "",
    password: "",
}
class editFD{
     addPerson(phone,address, establishment,contactperson,userId,tableName) {
        console.log(tableName);
         db.query('INSERT INTO ' +  tableName +  '(userId, address ,establishment,phone,contactperson) VALUES('+userId+','+address+','+
                    establishment+','+ phone + ',' + contactperson +');', function (err, result) {
                if (err) {
                    return err;
                }else{
                    return result;
                }
            })
           
          }
        
}
module.exports= editFD;