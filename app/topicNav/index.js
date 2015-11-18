var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'topicNavService', [ 'dataService', service ] )
		.controller('TopicNavController', ['$rootScope', '$routeParams', '$scope', '$location', 'topicNavService', 'temp_app', Controller]);
};