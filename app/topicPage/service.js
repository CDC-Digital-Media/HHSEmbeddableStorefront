var COLUMNS = require( '../config/SETTINGS' ).TOPIC_PAGE.COLUMNS;

function transform( data ) {

	var items = data[ 0 ].items.filter( value => value.mediaUsageCount > 0 ),
		maxItemsPerColumn = Math.ceil( items.length / COLUMNS ),
		i = 0,
		accumulator = [];

	// initialize accumulator array
	for ( ; i < COLUMNS; i++ ) {
		accumulator.push( [] );
	}

	// reduce object to use minimum properties
	return items.reduce( ( result, { id, name }, index ) => {

		var arrayPosition = Math.floor( index / maxItemsPerColumn );
		result[ arrayPosition ].push( { id, name } );
		return result;

	}, accumulator );
}

module.exports = function ( dataService ) {

	return {
		get: function ( id ) {
			return dataService.getTopicIndex( id ).then( ({ data }) => ({ data: transform( data ), name: data[0].name}) );
		}
	};
};