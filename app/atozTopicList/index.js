var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'atozTopicListService', [ 'dataService', service ] )
		.controller( 'AtozTopicListController', [ 'atozTopicListService', '$scope', '$location', '$routeParams', 'temp_app', Controller ] );
};