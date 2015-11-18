var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'usageGuidelinesService', [ 'dataService', service ] )
		.controller('UsageGuidelinesController', ['$location', '$rootScope', '$routeParams', 'userService', 'usageGuidelinesService', 'temp_app', Controller]);
};