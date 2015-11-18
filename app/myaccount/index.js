var Controller	= require('./controller');

module.exports = function ( module ) {

	module
		.controller( 'MyAccountController', [ 'temp_app', 'userService', Controller ] );
};