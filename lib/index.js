module.exports = function (app) {
	return {
		importer: require('./importer')(app),
		opener: require('./opener')(app),
		slack: require('./slack')(app)
	};
};
