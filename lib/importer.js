var redis = require('redis');
var config = require('../config');

module.exports = function (app) {
	var client = app.get('client');
	var overwrite = config.allowImportOverwrite;

	return function (cansJson) {

		client.on('error', function (err) {
			console.error('Error ' + err);
		});

		for (var can in cansJson) {
			if (cansJson.hasOwnProperty(can)) {
					client.set(can, JSON.stringify(cansJson[can]), redis.print);
			}
		}
	};
};
