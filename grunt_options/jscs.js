'use strict';

module.exports = {
	'new': {
		options: {
			// allow EcmaScript 6
			esnext: true,
			disallowKeywordsOnNewLine: [ 'else' ],
			disallowMixedSpacesAndTabs: true,
			disallowTrailingWhitespace: true,
			requireParenthesesAroundIIFE: true
		},
		src: [
			// 'app/**/*.js',   there are some bugs in Esprima???
			'grunt_options/**/*.js',
			'Gruntfile.js',
			'!app/_bundle.js',
			'!app/VERSION.tmpl.js'
		]
	},
	old: {
		options: {
			disallowKeywordsOnNewLine: [ 'else' ],
			disallowMixedSpacesAndTabs: true,
			disallowTrailingWhitespace: true,
			requireParenthesesAroundIIFE: true
		},
		src: [
			'js/**/*.js',
			'!js/libs/**/*.js',
			'!js/_bundle*.js',
			'!js/_ecard_bundle*.js',
			'!js/CONFIG.tmpl.js'
		]
	}
};