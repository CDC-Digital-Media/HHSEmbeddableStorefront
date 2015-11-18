function transform( data ) {
	// reduce object to use minimum properties
	return data
		.map( ({ letter, mediaCount }) => ({ letter, hasItems: ( mediaCount > 0 ) }) );
}

module.exports = function ( dataService ) {

	return {
		get: function () {
			return dataService.getAtoZList().then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}
	};
};