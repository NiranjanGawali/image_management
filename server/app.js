var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config');
var winstonLogger = require('./logger/log');
var multer = require('multer');
var expressFileUpload = require('express-fileupload');
var compression = require('compression');
const expressValidator = require('express-validator');

mongoose.connect(config.MONGO_URI, { promiseLibrary: require('bluebird'),useNewUrlParser: true  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


app.use(cors());
app.options('*', cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(compression());
app.use(expressValidator());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Taking controller links
var fileRouter = require('./routes/fileManagement/fileController');

app.use('/', fileRouter);

app.use(function(req, res, next) {
  if (config.LOGGER) {
    winstonLogger.info(req.path);
    if (req.method === 'GET') {
      winstonLogger.info('Request Query', req.query);
    }
    if (req.method === 'POST') {
      winstonLogger.info('Request Body', req.body);
    }
    if (req.method === 'DELETE') {
      winstonLogger.info('Request Body', req.body);
    }
    winstonLogger.info('Auth Token', req.headers.authorization);
    next();
  }
  else {
    next();
  }
});


// create a cors middleware
app.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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


String.prototype.toObjectId = function () {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};


module.exports = app;
