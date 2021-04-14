const express = require('express');
const mysql = require('mysql');
// https://www.phpmyadmin.co/
// Create connection
const db2 = mysql.createConnection({
    host     : 'sql11.freemysqlhosting.net',
    user     : 'sql11404352',
    password : 'eY37h9d5fJ',
    port : '3306',
    database: 'sql11404352',
   
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