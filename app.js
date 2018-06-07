'use strict';

var express = require('express');
// let morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
module.exports = app; // this line is only used to make testing easier.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./routes'));
// remember to plug in your router and any other middleware you may need here.

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
