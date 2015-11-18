var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'emailValidationService', [ 'dataService', service ] )
		.controller( 'CreateLoginController', [ '$scope', 'userService', 'emailValidationService', Controller ] );
};