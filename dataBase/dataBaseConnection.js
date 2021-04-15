const express = require('express');
const mysql = require('mysql');
// https://www.phpmyadmin.co/
// Create connection
/*
You have successfully created a new database. The details are below.

Username: CSFcE5yL7Y

Database name: CSFcE5yL7Y

Password: FK8npv2oee

Server: remotemysql.com

Port: 3306

These are the username and password to log in to your database and phpMyAdmin

*/ 
const db2 = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'CSFcE5yL7Y',
    password : 'FK8npv2oee',
    port : '3306',
    database: 'CSFcE5yL7Y',
   
});
/*
//
the new recorder will check by between start and end date;
*/ 

db2.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

module.exports = db2;