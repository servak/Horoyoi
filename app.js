const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const casts = require('./routes/casts');
const videos = require('./routes/videos');
const contents = require('./routes/contents');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', index);
app.use('/contents', contents);
app.use('/api/videos', videos);
app.use('/api/casts', casts);

module.exports = app;
