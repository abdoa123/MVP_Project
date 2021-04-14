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
    getAppointment = (date)=>{
        return new Promise((resolve,reject)=>{
            
            db.query('select * FROM  `appoinment` where date = ' + date,function(err,result){
                if(err){
                    resolve(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    }
    addAppointment =(req)=>
    {
        return new Promise((resolve,reject)=>{
           this.getAppointment(req.date).then(res=>{
             var result=JSON.stringify(res);  
             var json =  JSON.parse(result);              
                    if(res.length  ===0){
                        resolve("no date appaspdko");
                    }
                    else{
                            for(var i =0;i<json.length;i++){
                                /*
                                var shour = arr[0];
                                var newhour = newarr[0];
                                var smin =arr[1];
                                var newmin= newarr[1];
                                var ehour = newarr2[0];
                                var emin = newarr2[1];
                                
                               var newarr = req.startTime.split(':');
                               var newarr2 = json[i].endTime.split(':');
                               var arr = json[i].startTime.split(':');
                               var newMin = newarr[0]*60+newarr[1]*1; 
                               var stotalmin =  arr[0]*60+arr[1]*1;
                               var etotlalmin = newarr2[0]*60+newarr2[1]*1; 
                               var t = '24:00';
                               var tarray = t.split(':');
                               var t = tarray[0]*60+tarray[0]*1; 
                               */
                               var dt = new Date();//current Date that gives us current Time also
                               var startTime = json[i].startTime;
                               var endTime = json[i].endTime;
                               console.log(req.startTime);
                               var test = req.startTime;
                               var s =  startTime.split(':');
                               var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
                               
                               parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                               
                               var c =  test.split(':');
                               console.log(c);
                               var dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
                                                  parseInt(c[0]), parseInt(c[1]), parseInt(c[2]));
                               
                               var e =  endTime.split(':');
                               var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
                                                  dt.getDate(),parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                                                  console.log( (dt3 >= dt1 && dt3 <= dt2) ? 'Current time is between startTime and endTime' : 
                                  'Current time is NOT between startTime and endTime');
                                console.log('dt3 = ' + dt3  + ',  dt1 = ' + dt1 + ', dt2 =' + dt2)
                               if ((dt3 >= dt1 && dt3 <= dt2)) {

                                    resolve("reject");
                                }
                                   
                            }
                            resolve("accept")
                    }
                })
                
            });
        }
    
       


}
module.exports= requstss;
