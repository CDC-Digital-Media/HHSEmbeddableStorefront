function transform( data, letter ) {

	var previousName;

	return data
		.reduce( ( result, { items } ) => result.concat( items ), [] )
		// filter the letter
		.filter( ( value ) => value.mediaUsageCount > 0 && ( value.name.charAt( 0 ).toLowerCase() === letter.toLowerCase() ) )
		// sort
		.sort( ( a, b ) => a.name.localeCompare( b.name ) )
		// unique
		.reduce( ( result, { id, name } ) => {

			if ( previousName !== name ) {
				// reduce object to use minimum properties
				result.push( { id, name } );
			}
			previousName = name;
			return result;
		}, [] );
}

module.exports = function ( dataService ) {

	return {
		get: function ( letter ) {
			return dataService.getTopicChildren().then( ({ data, meta }) => ({ data: transform( data, letter ), meta }) );
		}
	};
};