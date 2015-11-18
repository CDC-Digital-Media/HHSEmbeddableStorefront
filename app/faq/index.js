var Controller	= require('./controller');

module.exports = function ( module ) {

	module
		.controller( 'FAQController', [ 'temp_app', Controller ] );
};