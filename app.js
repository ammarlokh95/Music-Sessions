import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

// import webpackDevServer from './webpack/dev-server';

dotenv.config();

const app = express();

const routes = require('./routes/Routes');

// logger
app.use(logger('combined'));

// Bodyparser MW
app.use(bodyParser.json());

// cookieParser middleware
app.use(cookieParser());

// serve static files from 'public'
app.use(express.static(path.join(__dirname, './public')));

// router flow
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
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

export default app;
