var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'searchService', [ 'dataService', service ] )
		.controller('SearchController', ['searchService', '$rootScope', '$scope', '$location', '$routeParams', 'temp_app', Controller]);
};