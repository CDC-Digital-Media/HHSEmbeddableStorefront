var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'topicsService', [ 'dataService', service ] )
		.controller('TopicsController', ['topicsService', '$scope', '$location', '$routeParams', 'resultRouteBuilder', Controller]);
};