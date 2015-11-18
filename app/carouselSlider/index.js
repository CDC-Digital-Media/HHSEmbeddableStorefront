var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'carouselSliderService', [ '$q', 'dataService', service ] )
		.controller( 'CarouselSliderController', [ 'carouselSliderService', 'temp_app', Controller ] );
};