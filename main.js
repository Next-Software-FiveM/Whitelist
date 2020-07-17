const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config.json');
const session = require('express-session');
const figlet = require('figlet');
const bodyParser = require("body-parser");
const colors = require('colors');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: config.panelInfo.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: config.panelInfo.sslEnabled }
}))

//INFO Routes



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

figlet('Next Solutions', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data.blue)
    console.log("CAD version 1.0.0b\nThis version is not for public use".blue)
    var server = app.listen(config.port, function () {
        var host = server.address().address
        var port = server.address().port
        
        console.log(`Cad is listening on port ${config.port}`.green.underline)
     })
});




 