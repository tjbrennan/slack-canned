var redis = require('redis');
var client = redis.createClient();


module.exports = function (id, callback) {

	client.on('error', function (err) {
		callback(new Error(err));
	});

	client.get(id, function (err, reply) {
		try {
			if (reply) {
				reply = JSON.parse(reply);
				callback(null, reply);
			} else {
				callback();
			}
		} catch (e) {
			callback(e);
		}

	});
};
