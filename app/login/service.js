// #DN TODO
function transform( data ) {
	return data;
}

module.exports = function ( dataService ) {

	return {
		login: function ( loginData ) {
			return dataService.loginUser( loginData ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}
	};
};