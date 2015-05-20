var redis = require('redis');
var client = redis.createClient();


module.exports = function (req, res, next) {
	var id = req.params.phrase_id;

	client.on('error', function (err) {
		console.error('Error ' + err);
	});

	client.get(id, function (err, reply) {
		res.status(200).send(reply);
	});
};
