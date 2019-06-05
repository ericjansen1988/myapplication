#!/usr/bin/env node

import '@babel/polyfill'


console.log('Starting env ' + process.env.ENV)
const env_http_port = (process.env.ENV === 'DEV' ? 3005 : 3001)
const env_https_port = (process.env.ENV === 'DEV' ? 3006 : 3002)

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('backend:server');
var http = require('http');
var fs = require('fs');
var https = require('https');

/**
 * Get port from environment and store in Express.
 */  

var http_port = normalizePort(process.env.PORT || '3001');
var https_port    =   process.env.PORT_HTTPS || 3002; 
var options = {
 key  : fs.readFileSync('./sslcert/privkey.pem'),
 cert : fs.readFileSync('./sslcert/fullchain.pem')
};

app.set("port",https_port);

/**
 * Create HTTP server.
 */

var server = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(https_port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof http_port === 'string'
    ? 'Pipe ' + http_port
    : 'Port ' + http_port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// Redirect from http port to https
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(http_port);


