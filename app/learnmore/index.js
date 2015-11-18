var Controller	= require('./controller');

module.exports = function ( module ) {

	module
		.controller( 'LearnMoreController', [ '$scope', '$location', '$anchorScroll', Controller ] );
};