// #DN TODO
function transform( data ) {
	return data;
}

module.exports = function ( dataService ) {

	return {
		agreeToUsageGuidelines: function ( id ) {
			return dataService.agreeToUsageGuidelines( { agreedToUsageGuidelines: true }, id ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}
	};
};