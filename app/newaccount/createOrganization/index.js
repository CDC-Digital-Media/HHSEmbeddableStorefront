var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'createOrganizationService', [ 'dataService', '$q', service ] )
		.controller( 'CreateOrganizationController', [ '$scope', 'createOrganizationService', 'userService', Controller ] );
};