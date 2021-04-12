var registerRouter = require('./Authenticate/register');
var loginRouter= require('./Authenticate/logIn');
var permission = require('./Router/permission');
var forgetpass = require('./Authenticate/forgetpass');
var doctorFD = require('./Router/doctorFD');
var allergy = require('./Router/allergy');
var diseases = require('./Router/diseases');
var createError = require('http-errors');
var express = require('express');
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
app.use('/frontDisk',doctorFD);
app.use('/authenticate/login', loginRouter);
app.use('/',permission);
app.use('/allergy',allergy);
app.use('/diseases',diseases);

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