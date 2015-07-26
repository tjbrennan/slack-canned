var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient();
var config = require('./config');

var app = express();
var port = process.env.PORT || 3000;

app.set('client', client);

var modules = require('./lib')(app);
var importer = modules.importer;
var opener = modules.opener;
var slacker = modules.slack;
var cans = require('./cans');

// automatically import predefined phrases into redis
modules.importer(cans);

app.use(bodyParser.urlencoded({extended: true}));

// test route
app.get('/', function (req, res, next) {
	res.status(200).send('hello');
});

app.get('/cans', function (req, res, next) {
	opener.all(function (error, reply) {
		if (error) {
			next(error);
		} else {
			res.status(200).send(reply);
		}
	});
});

app.get('/cans/' + config.listCommand, function (req, res, next) {
	opener.all(function (error, reply) {
		if (error) {
			next(error)
		} else {
			res.status(200).send(reply);
		}
	});
});

app.get('/cans/:phrase_id', function (req, res, next) {
	opener.single(req.params.phrase_id, function (error, reply) {
		if (error) {
			next(error);
		} else {
			res.status(200).send(reply);
		}
	});
});

app.post('/slack', slacker);

app.get('/dump', function (req, res, next) {
	opener.dump(function (error, reply) {
		if (error) {
			next(error);
		} else {
			res.status(200).send((reply));
		}
	});
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(400).send(err.message);
});

app.listen(port, function () {
	console.log('Slack canned listening on port ' + port);
});
