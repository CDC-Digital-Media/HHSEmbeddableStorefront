var Controller = require('./controller');

module.exports = function ( module ) {

	module
		.controller( 'MainController', [ '$rootScope', '$scope', '$location', '$timeout', 'temp_app', 'userService', Controller ] );
};