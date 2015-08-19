var opener = require('./opener');
var config = require('../config');


module.exports = function (app) {
	var defaults = config.defaults;
	var addEnabled = config.allowUserAdds;
	var list = config.listCommand;
	opener = opener(app);

	return function (req, res, next) {
		var text = req.body.text;
		var trigger = req.body.trigger_word;

		if (text && trigger) {
			text = text.replace(trigger, '')
									.trim()
									.split(' ');


			// list all commands
			if (list && list === text[0]) {
				opener.all(function (err, reply) {
					if (err) {
						return next(err);
					} else {
						return res.status(200).json(merge({
							text: reply.join('\n')
						}, defaults));
					}
				});
			} else {
				opener.single(text[0], function (err, reply) {
					if (err) {
						return next(err);

					} else if (reply) {
						reply = merge(reply, defaults);
						return res.status(200).json(reply);

					} else if (!reply && addEnabled && text.length > 1) {
						var key = text.shift();
						var value = text.join(' ');

						if (value[0] !== '{') {
							value = '{"text":' + JSON.stringify(value) + '}';
						}

						opener.add(key, value, function (err, reply) {
							if (err) {
								return next(err);
							} else {
								return res.status(200).json(merge({
									text: 'Added ' + trigger + key
								}, defaults));
							}
						});

					} else {
						return res.end();
					}
				});
			}
		} else {
			return res.end();
		}
	};
};



function merge (object, source) {
	var copy = {};

	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			copy[key] = source[key];
		}
	}

	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			copy[key] = object[key];
		}
	}

  if (copy.icon_url) {
    delete copy.icon_emoji;
  }

	return copy;
}
