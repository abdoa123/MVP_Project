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
    getPT = async (req)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from `Patient` where  id  = '+ req, function (err, result) {
            if (err) {
            console.log("err=>>" + err);
            resolve(err);
            }else{
                console.log("res=>" + result);
                resolve(result);
            }
                 })
                     })
    }                   
    getOrder = async (req,type)=>{
    
        return new Promise((resolve,reject)=>{

            if(type==1){
                console.log("11")
                var sql = 'SELECT  *  FROM Patient  JOIN labOrder ON Patient.id = labOrder.ptId AND Patient.id = '+req;
                db.query(sql, function (err, result) {
                if (err) {
                resolve(err);
                }else{      
                    resolve(result);
                }
                     })
        }else if(type==2){
            console.log("22")
            var sql = 'SELECT  *  FROM Patient  JOIN RadioOrder ON Patient.id = RadioOrder.ptId AND Patient.id = '+req;
            db.query(sql, function (err, result) {
            if (err) {
            resolve(err);
            }else{      
                resolve(result);
            }
                 })
        }else{
            console.log("33")
            var sql = 'SELECT  *  FROM Patient  JOIN pathologyOrder ON Patient.id = pathologyOrder.ptId AND Patient.id = '+req;
            db.query(sql, function (err, result) {
            if (err) {
            resolve(err);
            }else{      
                resolve(result);
            }
                 })
        }
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