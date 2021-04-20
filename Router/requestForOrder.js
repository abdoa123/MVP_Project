const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var db = require("../dataBase/dataBaseConnection");
app.use(bodyParser);
class requstss{
    addOrder = (req,tableName)=>{
        console.log(tableName); 
        return new Promise((resolve,reject)=>{
            db.query('INSERT INTO ' + '`'+ tableName +'`'+  '(ptId,drId,date,comments,status,result	) VALUES('+'"'+req.ptId+'"'+','+'"'+req.drId+'"'+','+'"'+req.date+'"'+','+'"'+req.comments+'"'+','+
            '"'+req.status+'"'+','+'"'+ req.result +'"' +');', function (err, result) {
            if (err) {
            console.log(err)
            resolve(false);
            }else{
                resolve(true);
            }
                 })
                     })
                        }
    getOrder = (req,tableName)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from '+tableName+'where id ='+ req.id, function (err, result) {
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
    updateOrder = (req,tableName)=>{
        return new Promise((resolve,reject)=>{
            db.query('UPDATE'+tableName+'SET ptId = '+req.ptId+', drId = ' + req.drId+', date = "'+req.date+'", comments = "'+req.comments+' "' + ', status = "'+ req.status+' "' + ', result = "'+ req.result+'" where id = ' + req.id,function(err,result){
                if(err){
                    resolve(err);
                }
                else{
                    resolv(true);
                }
            } )
        })
    }
    deleteOrder = (req,tableName)=>{
        return new Promise((resolve,reject)=>{
            db.query('DELETE  FROM '+tableName+' where id = ' + req.id,function(err,result){
                if(err){
                   resolve(err);
                }
                else{
                    resolve(true);
                }
            })
        })
    }                    
}
module.exports= requstss;