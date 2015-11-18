module.exports = function ( dataService ) {

	return {
		getData: function ( url, next ) {
			var params = {urlcontains: url};
			return dataService.searchMedia(params).then( ({ data, meta }) => ({ data, meta }) );
		}
	};
};