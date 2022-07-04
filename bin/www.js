#!/usr/bin/env node

//NPM libraries
const { app } = require("../src/app");
const debug = require('debug')('api:server'); //debug for console.log 



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
 const server = app.listen(port, () => {
  console.log(`Server started on Port:  ${port}`);
  onListening();
}).on('error', (error) => {
  console.log('Error happened: ');
  onError(error);
});


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

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
  var serverAddress = server.address();

  var bind = typeof serverAddress.address === 'string'
    ? 'pipe ' + serverAddress.address
    : 'port ' + serverAddress.port;
  debug('Listening on ' + bind);
}
