var Controller	= require('./controller');
var service 	= require('./service');

module.exports = function ( module ) {

	module
		.factory( 'reportProblemService', [ service ] )
		.controller( 'ReportProblemController', [ 'reportProblemService', 'userService', 'temp_app', '$sce', Controller ] );
};