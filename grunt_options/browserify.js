'use strict';

var es6ify = require( 'es6ify' );

module.exports = {

	// MISSING SOURCE MAPS FOR DEV --->
	dev: {
		options: {
			browserifyOptions: {
				debug: true
			},
			transform: [
				es6ify.configure(/^(?!.*node_modules)+.+\.js$/)
			]
		},
		// single entry point for the app
		src: [ es6ify.runtime, 'app/index.js' ],
		// compile to a single file to add a script tag for in your HTML
		dest: 'app/_bundle.js'
	},
	prod: {
		options: {
			transform: [
				es6ify.configure(/^(?!.*node_modules)+.+\.js$/)
			]
		},
		// single entry point for the app
		src: [ es6ify.runtime, 'app/index.js' ],
		// compile to a single file to add a script tag for in your HTML
		dest: 'app/_bundle.js'
	}
};