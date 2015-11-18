module.exports = function ( dataService ) {

	return {
		urlExists: function (data) {
			return dataService.urlExists(data);
		}
	};
};


