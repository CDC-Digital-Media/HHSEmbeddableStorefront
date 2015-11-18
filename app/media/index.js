var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'mediaService', [ 'dataService', service ] )
		.controller('MediaController', ['mediaService', 'userService', 'syndicationListService', '$routeParams', '$rootScope', 'temp_app', 'resultRouteBuilder', Controller]);
};