import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import webpackDevServer from '../webpack/dev-server';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const app = express();

const routes = require('../routes/Login/routes');

// logger
app.use(logger('combined'));

// Bodyparser MW
app.use(bodyParser.json());

// cookieParser middleware
app.use(cookieParser());
// Login flow
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
  next();
});

// view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// include webpack-dev-server for development only
if (process.env.NODE_ENV !== 'production') {
  webpackDevServer(app);
}

module.exports = app;
