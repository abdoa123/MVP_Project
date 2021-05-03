var registerRouter = require('./Authenticate/register');
var loginRouter= require('./Authenticate/logIn');
var permission = require('./Router/permission');
var forgetpass = require('./Authenticate/forgetpass');
var doctorFD = require('./Router/frontDesk/doctorFD');
var radioFD = require('./Router/frontDesk/radioFrontDisk');
var pathologFD = require('./Router/frontDesk/pathologisFD');
var labFD = require('./Router/frontDesk/labFrontDisk');
var appointment = require('./Router/appointment');
var allergy = require('./Router/type/allergy');
var changePasswordRouter = require('./Authenticate/ChangePassword')
var UpdatePhoto = require('./Authenticate/updatePhoto')
var employee = require('./Router/employees/employee');
var payment = require('./Router/type/payment');
var diseases = require('./Router/type/diseases');
var labs = require('./Router/employees/labs');
var radio = require('./Router/employees/radio');
var doctor = require('./Router/employees/doctor');
var ass = require('./Router/employees/assistant');
var patho = require('./Router/employees/patho');
var drug = require('./Router/type/drugs');
var pt = require('./Router/pation');
var nurse = require('./Router/employees/nurse');
var radiogist = require('./Router/employees/radiogist');
var chemist = require('./Router/employees/chemist');
var radioOrder = require('./Router/order/radioOrder');
var labOrder = require('./Router/order/labOrder');
var visit = require('./Router/visit');
var pathologyOrder = require('./Router/order/pathologyOrder');
var  pathologist= require('./Router/employees/pathologist');
var createError = require('http-errors');
var session = require('./Router/session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors())

let startDate= new Date();
var dt1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1,startDate.getHours(),startDate.getMinutes(),startDate.getSeconds());
console.log(dt1)
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/authenticate', forgetpass);
app.use('/authenticate', registerRouter);
app.use('/dFrontDisk',doctorFD);
app.use('/lFrontDisk',labFD);
app.use('/pFrontDisk',pathologFD);
app.use('/rFrontDisk',radioFD);
app.use('/authenticate/login', loginRouter);


app.use('/authenticate/change_password', changePasswordRouter);
app.use('/authenticate/update_phote', UpdatePhoto);

app.use('/',permission);
app.use('/lab',labOrder);
app.use('/radio',radioOrder);
app.use('/pathology',pathologyOrder);
app.use('/allergy',allergy);
app.use('/diseases',diseases);
app.use('/employee',employee);
app.use('/payment',payment);
app.use('/labs',labs);
app.use('/radios',radio);
app.use('/patho',patho);
app.use('/nurse',nurse);
app.use('/assistant',ass);
app.use('/doctor',doctor);
app.use('/radiogist',radiogist);
app.use('/chemist',chemist)
app.use('/pathologist',pathologist)
app.use('/drug',drug);
app.use('/appointment',appointment);
app.use('/visit',visit);
app.use('/pt',pt);
app.use('/session',session);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.json({ error: err})

});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Ready on port %d', port);
});