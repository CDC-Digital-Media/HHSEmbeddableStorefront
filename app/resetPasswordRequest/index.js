var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'resetPasswordRequestService', [ 'dataService', service ] )
		.controller( 'ResetPasswordRequestController', [ '$location', 'resetPasswordRequestService', Controller ] );
};