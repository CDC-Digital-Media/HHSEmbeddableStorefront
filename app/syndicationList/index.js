var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'syndicationListService', [ 'dataService', service ] )
		.controller('SyndicationListController', ['syndicationListService', 'userService', '$routeParams', '$rootScope', 'temp_app', Controller]);
};