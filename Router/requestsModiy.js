const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var db = require("../dataBase/dataBaseConnection");
app.use(bodyParser);

class requstss{
    addPerson = (req,tableName)=>{
    console.log(tableName);
    return new Promise((resolve,reject)=>{
        db.query('INSERT INTO ' +  tableName +  '(userId, address ,establishment,phone,contactperson) VALUES('+req.userId+','+req.address+','+
        req.establishment+','+ req.phone + ',' + req.contactperson +');', function (err, result) {
        if (err) {
        console.log("err=>>" + err);
        resolve(false);
        }else{
            console.log("res=>" + result);
            resolve(true);
        }
             })
                 })
                    }
    getPerson = (id,tableName)=>{
        return new Promise((resolve,reject)=>{
        db.query('select * from ' + tableName + ' where ID = ' + id,function(err,result){
            if(err){
                resolve(err);
            }
            else{
                resolve(result);
            }
        })
    })
       }
    updatePerson = (req,tableName)=>{
        return new Promise((resolve,reject)=>{
            db.query('UPDATE ' +tableName + ' SET phone = '+req.phone+', address = ' + req.address+', establishment = ' + req.establishment+', contactperson = '
             +req.contactperson+'where ID = ' + req.ID,function(err,result){
                 if(err){
                     console.log(err);
                    resolve(false);
                 }
                 else{
                     console.log(result);
                     resolve(true);
                 }
             } )
        })
    }

    deletePerson = (req,tableName)=>{
        return new Promise((resolve,reject)=>{
        db.query('DELETE FROM  ' + tableName + ' where ID = ' + req.ID,function(err,result){
            if(err){
                resolve(false);
            }
            else{
                resolve(true);
            }
        })
    })
       }
       


}
module.exports= requstss;
