var Controller	= require('./controller');

module.exports = function ( module ) {

	module
		.controller( 'AdditionalResourcesController', [ 'temp_app', Controller ] );
};