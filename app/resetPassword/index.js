var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'resetPasswordService', [ 'dataService', service ] )
		.controller( 'ResetPasswordController', [ '$routeParams', '$location', 'resetPasswordService', 'temp_app', '$scope', Controller ] );
};