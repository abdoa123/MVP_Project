const express = require('express');
const router = express.Router();
var db = require("../dataBase/dataBaseConnection");

class requstss{
    addOrder = (req,tableName)=>{
        console.log(tableName); 
        return new Promise((resolve,reject)=>{
            db.query('INSERT INTO ' + '`'+ tableName +'`'+  '(ptId,drId,date,comments,status,result,labId	) VALUES('+'"'+req.ptId+'"'+','+'"'+req.drId+'"'+','+'"'+req.date+'"'+','+'"'+req.comments+'"'+','+
            '"'+req.status+'"'+','+'"'+ req.result +'"'+','+'"'+ req.labId +'"'+');', function (err, result) {
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
    getOrdersByLab = (labId)=>{
        return new Promise((resolve,reject)=>{
            // db.query("SELECT Lo.id,Lo.comments,P.id as PtID,P.firstname,P.secondName,P.lastname,P.address,P.phone FROM labFrontDisk LFD Join labs  L on LFD.labId = L.id Join labOrder Lo on Lo.labId = L.id Join Patient P on Lo.ptId = P.id where LFD.labId ="+req.params.labID+" AND LFD.id="+req.params.labFdId,function(err,result){
            //     if(err){
            //         reject(err)
            //     }else{
            //         resolve(result)
            //     }
            // })
            db.query("SELECT Lo.id,Lo.result,P.id as PtID,P.firstname,P.secondName,P.lastname,P.address,P.phone from labOrder Lo Join Patient P on Lo.ptId = P.id  where labId = "+labId,function(err,result){
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
             
        })
    }    
                 
    getLabByLabFrontDisk = (userId)=>{
        return new Promise((resolve,reject)=>{

            db.query("SELECT labId from `labFrontDisk` where userId = "+userId,function(err,result){
                if(err){
                    reject(err)
                }else{
                    resolve(result[0])
                }
            })
             
        })
    }    
                 
    getOrder = async (req,type ,labId)=>{
    
        return new Promise((resolve,reject)=>{

            if(type==4){
                console.log("444")
                var sql = 'SELECT  *  FROM  labOrder where LfDId IS  NULL';
                db.query(sql, function (err, result) {
                if (err) {
                    console.log(err)  
                    resolve(err);
                }else{    
                    console.log(result)  
                    resolve(result);
                }
                     })}
        else if(type==3){
            console.log("3333")
            var sql = 'SELECT  *  FROM Patient  JOIN RadioOrder ON Patient.id = RadioOrder.ptId AND Patient.id = '+req;
            db.query(sql, function (err, result) {
            if (err) {
            resolve(err);
            }else{      
                resolve(result);
            }
                 })
        }
        else if(type==0){
            console.log("0000")
            // var sql = 'SELECT  *  FROM labOrder where ptId = '+req;
            var sql = 'SELECT  *  FROM labOrder where ptId =  ' + '"' + req + '"' + 'and labId =' + labId;
            db.query(sql, function (err, result) {
            if (err) {
                console.log("errorr: ",err)
            resolve(err);
            }else{      
                resolve(result);
            }
                 })
            }
            else if(type==1){
                console.log("111")
                var sql = 'SELECT  *  FROM RadioOrder where ptId = '+req;
                db.query(sql, function (err, result) {
                if (err) {
                resolve(err);
                }else{      
                    resolve(result);
                }
                     })
        }
        else if(type==2){
            console.log("222")
            var sql = 'SELECT  *  FROM pathologyOrder where ptId = '+req;
            db.query(sql, function (err, result) {
            if (err) {
            resolve(err);
            }else{      
                resolve(result);
            }
                 })
    }
        
        
        
        else{
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
            db.query('UPDATE '+tableName+' SET ptId = '+req.ptId+', drId = ' + req.drId+', date = "'+req.date+'", comments = "'+req.comments+' "' + ', status = "'+ req.status+' "' + ', result = "'+ req.result+'" where id = ' + req.id,function(err,result){
                if(err){
                    console.log(err);
                    resolve(err);
                }
                else{
                    resolve(true);
                }
            } )
        })}

    updateOrderResult = (req,tableName)=>{
        console.log("result : " , req.result)
        return new Promise((resolve,reject)=>{
            db.query('UPDATE '+tableName+' SET result = "'+ req.result+'" where id = ' + req.id,function(err,result){
                if(err){
                    console.log("oooooooooooooooo",err);
                    reject(err);
                }
                else{
                    console.log("yyyyyyyy");
                    resolve(result);
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