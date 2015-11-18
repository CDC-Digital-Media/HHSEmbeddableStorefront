module.exports = function ( dataService ) {

	return {
		update: function ( data ) {
			return dataService.updateUserPassword( data );
		}
	};
};