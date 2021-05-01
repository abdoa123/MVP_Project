const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var db = require("../dataBase/dataBaseConnection");

class requstss {
    addPerson = (req, tableName) => {
        console.log(tableName);
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO ' + '`' + tableName + '`' + '(userName,password,Email,address,establishment,phone,contactperson) VALUES(' + '"' + req.userName + '"' + ',' + '"' + req.password + '"' + ',' + '"' + req.email + '"' + ',' + '"' + req.address + '"' + ',' +
                '"' + req.establishment + '"' + ',' + '"' + req.phone + '"' + ',' + '"' + req.contactperson + '"' + ');', function (err, result) {
                    if (err) {
                        console.log("err=>>" + err);
                        resolve(false);
                    } else {
                        console.log("res=>" + result);
                        resolve(true);
                    }
                })
        })
    }
    getPerson = (id, tableName) => {
        return new Promise((resolve, reject) => {
            db.query('select * from ' + tableName + ' where id = ' + id, function (err, result) {
                if (err) {
                    resolve(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    }
    updatePerson = (req, tableName) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE ' + tableName + ' SET phone = ' + req.phone + ', address = ' + req.address + ', establishment = ' + req.establishment + ', contactperson = '
                + req.contactperson + 'where ID = ' + req.ID, function (err, result) {
                    if (err) {
                        console.log(err);
                        resolve(false);
                    }
                    else {
                        console.log(result);
                        resolve(true);
                    }
                })
        })
    }

    deletePerson = (req, tableName) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM  ' + tableName + ' where ID = ' + req.ID, function (err, result) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            })
        })
    }
    getAppointment = (req) => {
        return new Promise((resolve, reject) => {

            db.query('select * FROM  `appoinment` where date = ' + '"' + req.date + '"' + 'and drFDId = ' + req.drFDId, function (err, result) {
                if (err) {
                    resolve(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    }
    getPtId = (first,last,second)=>{
        return new Promise((resolve, reject) => {

            db.query('select * FROM  `Patient` where firstName = ' + '"' + first + '"' + 'and secondName = ' +'"'+ second +'" and lastName = ' +'"'+last+'"' , function (err, result) {
                if (err) {
                    resolve(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    }
    addAppointment = (req, endtime2, pataint) => {
        return new Promise((resolve, reject) => {
            this.getPtId(pataint).then(res => {
                this.getAppointment(req).then(res => {
                    console.log(res);
                    var result = JSON.stringify(res);
                    var json = JSON.parse(result);
                    if (res.length === 0) {
                        console.log("test");
                        var t = req.startTime + ":00";
                        console.log(req.patientName + ',' + req.reason +
                            ',' + "'" + t + "'" + ',' + "'" + endtime2 + "'" + ',' + req.drFDId + ',' + req.date)
                        db.query('INSERT INTO `appoinment` (patientName, reason,startDate,endDate,drFDId,date,ptId) VALUES  (' + '"' + pataint + '"' + ',' + '"' + req.reason + '"' +
                            ',' + "'" + t + "'" + ',' + "'" + endtime2 + "'" + ',' + req.drFDId + ',' + '"' + req.date + '"' + ')', function (err1, result2) {
                                if (err1) {
                                    console.log(err1)
                                    resolve(err1);

                                } else {
                                    console.log(result2)

                                    resolve(result2);
                                }

                            });
                    }
                    else {
                        for (var i = 0; i < json.length; i++) {
                            console.log("dasd");
                            var dt = new Date();//current Date that gives us current Time also
                            var startTime = json[i].startDate;
                            var endTime = json[i].endDate;
                            console.log(req.startTime);
                            var test = req.startTime;
                            test = test + ':00';
                            var s = startTime.split(':');
                            var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),

                                parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));

                            var c = test.split(':');
                            console.log(c);
                            var dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
                                parseInt(c[0]), parseInt(c[1]), parseInt(c[2]));

                            var e = endTime.split(':');
                            var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
                                dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                            console.log((dt3 >= dt1 && dt3 <= dt2) ? 'Current time is between startTime and endTime' :
                                'Current time is NOT between startTime and endTime');
                            console.log('dt3 = ' + dt3 + ',  dt1 = ' + dt1 + ', dt2 =' + dt2)
                            if ((dt3 >= dt1 && dt3 <= dt2)) {

                                resolve("reject");
                            }

                        }

                        var t = req.startTime + ":00";
                        db.query('INSERT INTO `appoinment` (pationName, reason,startDate,endDate,drFDId,date ) VALUES  (' + req.pationName + ',' + req.reason +
                            ',' + "'" + t + "'" + ',' + "'" + endtime2 + "'" + ',' + req.drFDId + ',' + req.date + ')', function (err1, result2) {
                                if (err1) {
                                    resolve(err1);

                                } else {

                                    resolve(result2);
                                }

                            });

                    }
                })

            })


        });
    }
    updateEmployee = (req, tableName) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE ' + tableName + ' SET firstName = ' + '"' + req.body.firstName + '"' + ', lastName = ' + '"' + req.body.lastName + '"' + ', password = '
                + '"' + req.body.password + '"' + ', degree = ' + '"' + req.body.degree + '"' + ', Date = '
                + '"' + req.body.date + '"' + ', address = ' + '"' + req.body.address + '"' + ', phone = '
                + '"' + req.body.phone + '"' + ', Email =' + '"' + req.body.email + '"' + ', userName =' + '"' + req.body.userName + '"' + ' where id = ' + req.body.id, function (err, result) {
                    if (err) {
                        console.log(err);
                        resolve(err);
                    }
                    else {
                        console.log(result);
                        resolve(true);
                    }
                })
        })
    }

    addPatient = (req) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO `Patient` (phone,address,email,birthDate,maritalStatus,bloodGroup,firstName,lastName,middleName) VALUES(' + '"' + req.userName + '"' + ',' + '"' + req.password + '"' + ',' + '"' + req.email + '"' + ',' + '"' + req.address + '"' + ',' +
                '"' + req.establishment + '"' + ',' + '"' + req.phone + '"' + ',' + '"' + req.contactperson + '"' + ');', function (err, result) {
                    if (err) {
                        console.log("err=>>" + err);
                        resolve(false);
                    } else {
                        console.log("res=>" + result);
                        resolve(true);
                    }
                })
        })
    }

}

module.exports = requstss;