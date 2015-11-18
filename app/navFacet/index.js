var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'navFacetService', [ 'dataService', service ] )
		.controller('NavFacetController', ['$rootScope', '$routeParams', '$scope', '$location', 'resultRouteBuilder', 'navFacetService', Controller]);
};