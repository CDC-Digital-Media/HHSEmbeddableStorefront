var Controller	= require('./controller');

module.exports = function ( module ) {

	module.controller( 'SuccessPageController', [ 'temp_app', Controller ] );
};