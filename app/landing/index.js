var Controller = require('./controller');
var service = require('./service');

module.exports = function ( module ) {

	module
		.factory('LandingService', ['dataService', service])
		.controller('LandingController', ['$location', '$routeParams', 'LandingService', 'resultRouteBuilder', Controller]);
};