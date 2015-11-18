function transform( data ) {

	// reduce object to use minimum properties
	return data.map( ({ id, name }) => ({ id, name }) );
}

module.exports = function ( dataService ) {

	return {
		get: function ( items ) {
			return dataService.getTopSyndicated( items ).then( ({ data }) => ({ data: transform( data )}) );
		}
	};
};