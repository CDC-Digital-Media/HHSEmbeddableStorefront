var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'loginService', [ 'dataService', service ] )
		.controller( 'LoginController', [ '$routeParams', '$location', '$scope', '$rootScope', 'loginService', 'userService', 'temp_app', Controller ] );
};