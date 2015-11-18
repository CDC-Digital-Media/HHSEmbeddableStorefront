var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'existingOrganizationService', [ 'dataService', service ] )
		.controller( 'ExistingOrganizationController', [ '$scope', 'existingOrganizationService', 'userService', Controller ] );
};