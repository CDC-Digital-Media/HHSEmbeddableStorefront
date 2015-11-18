var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'ecardService', [ 'dataService', service ] )
		.controller( 'EcardController', [ '$routeParams', 'ecardService', 'temp_app', Controller ] );
};