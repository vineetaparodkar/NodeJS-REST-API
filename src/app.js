//NPM libraries
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

//Swagger
const swaggerUi = require("swagger-ui-express");
let swaggerFile;
try {
  swaggerFile = require("../docs/swagger_output.json");
} catch (e) {
  console.log("Starting server without swagger");
}

const app = express();

global.appRoot = path.resolve(__dirname);

//Swagger setup
try {
  app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (e) {
  console.log("Starting server without swagger");
}

//Routes for API
const index = require("./routes/v1/index.router");


// Using body parser to parse the request body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use(index);

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

module.exports.app = app;
