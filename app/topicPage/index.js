var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'topicPageService', [ 'dataService', service ] )
		.controller('TopicPageController', ['topicPageService', '$scope', '$location', '$routeParams', 'temp_app', Controller]);
};