var service = require('./service');

module.exports = function ( module ) {

	module
		.factory( 'userService', [ service ] );
};