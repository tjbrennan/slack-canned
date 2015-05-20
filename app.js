var express = require('express');
var bodyParser = require('body-parser');
var importer = require('./importer');
var cans = require('./cans');
var opener = require('./opener');

var app = express();
var port = process.env.PORT || 3000;

importer(cans);

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res, next) {
	res.status(200).send('hello');
});

app.get('/cans', function (req, res, next) {
	res.end();
});

app.get('/cans/:phrase_id', opener);

app.post('/cans', function (req, res, next) {
	res.end();
});

app.use(function (err, req, res, next) {
	console.error(err.message);
	res.status(400).send(err.message);
});

app.listen(port, function () {
	console.log('Slack canned listening on port ' + port);
});
