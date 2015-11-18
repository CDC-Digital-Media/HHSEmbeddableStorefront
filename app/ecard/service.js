// #DN TODO transform missing!!!
function transform( data ) {
	return data;
}

module.exports = function ( dataService ) {

	return {
		get: function ( receiptId ) {
			return dataService.getEcard( receiptId ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}
	};
};