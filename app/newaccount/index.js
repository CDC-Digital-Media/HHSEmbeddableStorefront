var Controller		= require('./controller');
var service 		= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'newAccountService', [ 'dataService', service ] )
		.controller( 'NewAccountController', [ '$routeParams', '$location', '$rootScope', 'newAccountService', 'userService', 'temp_app', Controller] );
};