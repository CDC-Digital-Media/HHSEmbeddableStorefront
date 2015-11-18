'use strict';

module.exports = {

	'new': {
		options: {
			//quotmark: 'single',
			//curly: true,
			//eqeqeq: true,
			//eqnull: true,
			//browser: true,

			//globalstrict: true, //TEMP!! BAND AID!

			// allow EcmaScript 6
			esnext: true,

			// options here to override JSHint defaults
			globals: {
				//angular: true,
				require: true,	// node/browserify
				module: true,	// node/browserify
				exports: true,	// node/browserify
				console: true,

				CDC: true, // video lib needs it

				// temporary!!!:
				'$': true,

				// global node variables:
				process: true
			}
		},
		files: {
			src: [
				'app/**/*.js',
				// exlude files/folders:
				'!app/_bundle.js', // don't lint build file (FOR NOW?)
				'!app/VERSION.tmpl.js'
			],
		}
	},

	old: {
		options: {
			//quotmark: 'single',
			//curly: true,
			//eqeqeq: true,
			eqnull: true,
			//browser: true,

			globalstrict: true, //TEMP!! BAND AID!
			// options here to override JSHint defaults
			globals: {
				//angular: true,
				require: true,   // node/browserify
				module: true,    // node/browserify
				exports: true,	// node/browserify
				Buffer: true,	// node/browserify global module
				jQuery: true,
				'$': true,
				window: true,
				console: true,
				document: true,
				history: true,
				alert: true,
				CDC: true,
				location: true,
				grecaptcha: true,   // TEMP google captcha

				// global node variables:
				process: true
			}
		},
		files: {
			src: [
				'js/**/*.js',
				// exlude files/folders:
				'grunt_options/**/*.js',
				'Gruntfile.js',
				'!js/libs/**/*.js', // don't lint 3rd party js folder
				'!js/_bundle.js', // don't lint build file (FOR NOW?)
				'!js/_ecard_bundle*.js', // don't lint build file (FOR NOW?)
				'!js/CONFIG.tmpl.js'
			],
		}
	}

	/*
	client: {
		files: {
			src: [
				'client/app/*.js',
				//'client/app/app.js',
				//'client/controller/*.js'
			],
		}
	},
	server: {
		files: {
			src: [
				'Gruntfile.js',
				'app.js',
			],
		},
		options: {
			globals: {
				node: true
			}
		}
	}
	*/
};