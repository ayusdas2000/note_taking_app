var express = require('express');
var path = require('path');
const db = require('./models')
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname,'/views')

/**
 * Express framework used here
 */
var indexRouter = require('./routes/index');//api call are made in the routes/index.js
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirectoryPath));
app.use('/static', express.static('public'));
app.set('view engine', 'hbs')
hbs.registerPartials(publicDirectoryPath)


app.use('/', indexRouter);


/**
 * Application is running on port number 8000
 */
db.sequelize.sync().then((req)=>{
  app.listen(8000,()=>{
    console.log("server is up on port 8000")
  })
})