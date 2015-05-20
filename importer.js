var redis = require('redis');
var client = redis.createClient();


module.exports = function (cansJson) {

	client.on('error', function (err) {
		console.error('Error ' + err);
	});

	for (var can in cansJson) {
		if (cansJson.hasOwnProperty(can)) {
			client.set(can, JSON.stringify(cansJson[can]), redis.print);
		}
	}
};
