module.exports = function ( dataService ) {

	return {
		reset: function ( data ) {
			return dataService.resetUserPassword( data );
		}
	};
};