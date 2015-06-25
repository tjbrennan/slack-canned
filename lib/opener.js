
module.exports = function (app) {
	var client = app.get('client');

	return {
		single: function (id, callback) {

			client.on('error', function (err) {
				return callback(new Error(err));
			});

			client.get(id, function (err, reply) {
				try {
					if (reply) {
						reply = JSON.parse(reply);
						return callback(null, reply);
					} else {
						return callback();
					}
				} catch (e) {
					return callback(e);
				}
			});
		},

		// TODO
		all: function (callback) {
			callback();
		},

		add: function (id, value, callback) {

			client.on('error', function (err) {
				return callback(new Error(err));
			});

			client.set(id, value, callback);
		}
	};
};
