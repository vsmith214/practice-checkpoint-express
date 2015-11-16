var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app; //this line is only used to make testing easier

// REMEMBER TO PLUGIN YOUR ROUTERS HERE!

if (!module.parent) app.listen(3000); // conditional to prevent an EADDRINUSE error. Very esoteric issue with mocha watch & supertest.
