const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book-routes');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);


module.exports = app;
