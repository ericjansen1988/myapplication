//Inport .env file
require('dotenv').config();


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var epilogue = require("epilogue");
const session = require('express-session');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var fs = require('fs');


/* Database configuratie */
const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
});

var app = express();




// session support is required to use ExpressOIDC
app.use(session({
    secret: process.env.RANDOM_SECRET_WORD,
    resave: true,
    saveUninitialized: false
}));



// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: db.sequelize
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../frontend/build')));

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Routes
app.get('/health-check', (req, res) => res.sendStatus(200));
require('./app/routes.js')(app, db, epilogue);


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




module.exports = app;