var express = require('express');
var path = require('path');
const mysql = require('mysql2')
const db = require('./models')


/**
 * Express framework used here
 */
var indexRouter = require('./routes/index');//api call are made in the routes/index.js
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);


/**
 * Application is running on port number 8000
 */
db.sequelize.sync().then((req)=>{
  app.listen(8000,()=>{
    console.log("server is up on port 8000")
  })
})