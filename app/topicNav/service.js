function transform( data ) {

	return data
		.filter( value => value.mediaUsageCount > 0 )
		// reduce object to use minimum properties
		.map( ({ id, name, items }) => ({ id, name, items }) )
		.sort( ( a, b ) => a.name.localeCompare( b.name ) )
		.map( value => {

			value.items = value.items
				.filter( value => value.mediaUsageCount > 0 )
				// reduce object to use minimum properties
				.map( ({ id, name }) => ({ id, name }) )
				.sort( ( a, b ) => a.name.localeCompare( b.name ) );

			return value;
		});
}

module.exports = function ( dataService ) {

	return {
		get: function ( mediaType ) {
			return dataService.getTopicByMediaType( mediaType ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}
	};
};