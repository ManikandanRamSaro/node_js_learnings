const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();

//Middleware => middleware will be called each and every requests
app.use(express.json()); // used to collect and parse user request inputs

app.use(morgan('dev')); // used to retrive request details

app.use((req, res, next) => {
  console.log('Hellow from middleware 2');
  next();
});

app.use((req, res, next) => {
  // it will be called before the routing verbs called , we can change possition as well- it will be refect to only below lines of code like ****top down approach
  req.requestedTime = new Date().toLocaleDateString();
  next();
});

//Routers
//Router mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
