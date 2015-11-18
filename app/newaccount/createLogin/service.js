module.exports = function ( dataService ) {

	return {
		validateEmail: function ( data ) {
			return dataService.validateEmail( data );
		}
	};
};