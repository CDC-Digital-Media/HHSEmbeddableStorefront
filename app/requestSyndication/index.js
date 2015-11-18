var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'requestSyndicationService', ['dataService', service ] )
		.controller('RequestSyndicationController', ['requestSyndicationService', 'userService', 'temp_app', '$routeParams', '$sce', Controller]);
};