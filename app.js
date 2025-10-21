var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books.route');
var authorsRouter = require('./routes/authors.route.js');

var app = express();
var swaggerUi = require('swagger-ui-express');
var swaggerSpec = require('./config/swagger.config.js');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

module.exports = app;