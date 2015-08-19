
module.exports = function (app) {
	var client = app.get('client');

	return {
		single: function (id, callback) {
			var response;

			client.get(id, function (err, reply) {
				try {
					if (err) {
						return callback(new Error(err));
					} else if (reply) {
						try {
							response = JSON.parse(reply);
						} catch (e) {
							console.log(id, reply);
							return callback(e);
						}
						return callback(null, response);
					} else {
						return callback();
					}
				} catch (e) {
					return callback(e);
				}
			});
		},

		all: function (callback) {

			client.keys('*', function (err, reply) {
				if (err) {
					return callback(new Error(err));
				} else {
					return callback(null, reply);
				}
			});
		},

		add: function (id, value, callback) {

			client.set(id, value, function (err, reply) {
				if (err) {
					return callback(new Error(err));
				} else {
					return callback(null, reply);
				}
			});
		},

		dump: function (callback) {
			var dump = {};
			var self = this;

			self.all(function (err, reply) {
				var j = 0;
				if (err) {
					return callback(err);
				} else {
					for (var i = 0; i < reply.length; i++) {
						self.single(reply[i], function (singleErr, singleReply) {
							if (singleErr) {
								console.error(singleErr);
							} else if (singleReply) {
								dump[reply[j++]] = singleReply;
							}

							if (j === reply.length) {
								return callback(null, dump);
							}
						});
					}
				}
			});
		}
	};
};
