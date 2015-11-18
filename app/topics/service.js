function transform( data ) {

	var out;

	out = data
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

		var arrTopics = out
			.filter( value => value.name != 'Other' )
			.map( value => {
				value.collapsed = false;
		return value;
		});

		var arrOther = out
			.filter( value => value.name == 'Other' )
			.map( value => {
				value.collapsed = false;
		return value;
		})[0];

		// place the other topic at the bottom if it's available
		if (typeof arrOther !== 'undefined') {
			arrTopics.push(arrOther);
		}	

		return arrTopics;

}


module.exports = function ( dataService ) {

	return {
		getTopicByMediaType: function ( mediaType ) {
			return dataService.getTopicByMediaType( mediaType ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		},

		getTopicIndex: function ( id ) {
			return dataService.getTopicIndex( id ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}
	};
};