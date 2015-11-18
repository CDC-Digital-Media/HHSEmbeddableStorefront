function transform( data ) {

	// add 'All' (doesn't exist on service call)
	data.unshift( { name: '', description: 'All Media Types' } );

	// reduce object to use minimum properties
	return data
		.map( ({ name, description }) => ({ name, description }) );
}

module.exports = function ( dataService ) {

	return {
		get: function () {
			return dataService.getMediaTypes().then( ({ data }) => ({ data: transform( data )}) );
		}
	};
};