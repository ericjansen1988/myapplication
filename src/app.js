var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var epilogue = require("epilogue");
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var fs = require('fs');
import {oauthproviders} from './app/modules/application_cache';
import OAuth from './app/modules/Oauth';


/* Database configuratie */
const db = require('./app/models');

// force: true will drop the table if it already exists
//const forceUpdate = (process.env.ENV === 'DEV' && process.env.DB === 'DEV');
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
  
  //Laden van OAUTH configuratie
  (async () => {
    const allproviders = await db.oauthproviders.findAll();
    allproviders.forEach(provider => {
      const oauthprovider = new OAuth(provider.client_id, provider.client_secret, provider.tokenHost, provider);
      oauthproviders[provider.id] = oauthprovider
      //setData('oauthproviders', provider.id, oauthprovider);
    })
  })()
});

var app = express();



// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client/build')));

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
//First make all query params lowercase
app.use(function(req, res, next) {
  for (var key in req.query)
  { 
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});
app.get('/health-check', (req, res) => res.sendStatus(200)); //certificate route
require('./app/routes.js')(app);


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
