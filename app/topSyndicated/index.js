var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'topSyndicatedService', [ 'dataService', service ] )
		.controller( 'TopSyndicatedController', [ 'topSyndicatedService', 'temp_app', Controller ] );
};