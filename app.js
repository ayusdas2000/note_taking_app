var express = require('express');
var path = require('path');


var indexRouter = require('./routes/index');//api call are made in the routes/index.js


/**
 * Express framework used here
 */
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);


/**
 * Application is running on port number 8000
 */
app.listen(8000, () => {
  console.log('Server is up on port 8000')
})
