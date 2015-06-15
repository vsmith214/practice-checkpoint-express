var express = require('express')
var bodyParser = require('body-parser')
var app = express()
module.exports = app //this line is only used to make testing easier

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(require('./routes'))

app.listen(process.env.PORT || 3000)
