var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'navBasicService', [ 'dataService', service ] )
		.controller('NavBasicController', ['$rootScope', '$routeParams', '$scope', '$location', 'resultRouteBuilder', 'navBasicService', Controller]);
};