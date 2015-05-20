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

app.get('/cans/:phrase_id', function (req, res, next) {
	opener(req.params.phrase_id, function (error, reply) {
		if (error) {
			next(error);
		} else {
			res.status(200).send(reply);
		}
	});
});

app.post('/slack', function (req, res, next) {
	var text = req.body.text;
	var trigger = req.body.trigger_word;

	if (text && trigger) {
		text = text.replace(trigger, '');

		opener(text, function (error, reply) {
			if (error) {
				next(error);
			} else if (reply) {
				res.status(200).json(reply);
			} else {
				res.end();
			}
		});
	} else {
		res.end();
	}
});

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
