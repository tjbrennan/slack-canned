var opener = require('./opener');
var nconf = require('nconf').file({file:'./config.json'});
var defaults = nconf.get('defaults');

module.exports = {

	respond : function (req, res, next) {
		var text = req.body.text;
		var trigger = req.body.trigger_word;

		if (text && trigger) {
			text = text.replace(trigger, '');

			opener(text, function (error, reply) {
				if (error) {
					next(error);
				} else if (reply) {
					reply = merge(defaults, reply);
					res.status(200).json(reply);
				} else {
					res.end();
				}
			});
		} else {
			res.end();
		}
	}
};


function merge (object, source) {
	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			object[key] = source[key];
		}
	}

	return object;
}
