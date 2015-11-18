function transform( data ) {

	return data
		.map( ({ name, description }) => ({ name, description }) )
		.sort( ( a, b ) => a.name.localeCompare( b.name ) );
}


module.exports = function ( dataService ) {

	return {
		get: function () {
			return dataService.getMediaTypes().then( ({ data }) => ({ data: transform( data ) }) );
		}
	};
};
