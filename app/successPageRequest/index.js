var Controller	= require('./controller');

module.exports = function ( module ) {

	module.controller( 'SuccessPageRequestController', [ 'temp_app', Controller ] );
};