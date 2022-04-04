const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

// Connect to the database
require('./db');

app.set('trust proxy', true);

const userRouter = require('./router');

// App Setup
app.use(morgan('combined')); // Middleware to log out requests
app.use(bodyParser.json()); // Middleware to ???
app.use(userRouter);

module.exports = app;
