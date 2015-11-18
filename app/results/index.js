var Controller = require('./controller');
var service = require('./service');

module.exports = function (module) {

	module
		.factory('resultsService', ['dataService', service])
		.controller('ResultsController', ['resultsService', 'userService', 'syndicationListService', '$rootScope', '$scope', '$location', '$routeParams', 'temp_app', 'resultRouteBuilder', Controller]);
};