const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const connection = require('./dataAccess/database');

const app = express();

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion: ' + err.stack);
    return;
  }
  console.log("Connecté à la base de données avec l'ID " + connection.threadId);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
