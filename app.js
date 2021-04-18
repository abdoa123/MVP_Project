var registerRouter = require('./Authenticate/register');
var loginRouter= require('./Authenticate/logIn');
var permission = require('./Router/permission');
var forgetpass = require('./Authenticate/forgetpass');
var doctorFD = require('./Router/doctorFD');
var appointment = require('./Router/appointment');
var allergy = require('./Router/allergy');
var employee = require('./Router/employee');
var payment = require('./Router/payment');
var diseases = require('./Router/diseases');
var labs = require('./Router/labs');
var doctor = require('./Router/doctor');
var ass = require('./Router/assistant');
var patho = require('./Router/patho');
var drug = require('./Router/drugs');
var nurse = require('./Router/nurse');
var radiogist = require('./Router/radiogist');
var chemist = require('./Router/chemist');

var  pathologist= require('./Router/pathologist');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors())



app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authenticate', forgetpass);
app.use('/authenticate', registerRouter);
app.use('/dFrontDisk',doctorFD);
app.use('/authenticate/login', loginRouter);
app.use('/',permission);
app.use('/allergy',allergy);
app.use('/diseases',diseases);
app.use('/employee',employee);
app.use('/payment',payment);
app.use('/labs',labs);
app.use('/patho',patho);
app.use('/nurse',nurse);
app.use('/assistant',ass);
app.use('/doctor',doctor);
app.use('/radiogist',radiogist);
app.use('/chemist',chemist)
app.use('/pathologist',pathologist)
app.use('/drug',drug);
app.use('/appointment',appointment);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.json({ error: "err" })

});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Ready on port %d', port);
});