var Controller	= require('./controller');

module.exports = function ( module ) {

	module
		.controller( 'CreateContactController', [ '$scope', 'userService', Controller ] );
};