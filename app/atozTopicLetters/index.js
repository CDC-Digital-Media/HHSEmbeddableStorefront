var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'atozTopicLettersService', [ 'dataService', service ] )
		.controller( 'AtozTopicLettersController', [ 'atozTopicLettersService', Controller ] );
};