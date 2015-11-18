'use strict';

var path = require( 'path' ),
	_ = require( 'lodash' ),
	concatOptions = require( './grunt_options/concat' ),
	jshintOptions = require( './grunt_options/jshint' ),
	jscsOptions = require( './grunt_options/jscs' ),
	browserifyOptions = require( './grunt_options/browserify' ),
	uglifyOptions = require( './grunt_options/uglify' ),
	htmlminOptions = require( './grunt_options/htmlmin' ),
	lessOptions = require( './grunt_options/less' ),
	replaceOptions = require( './grunt_options/replace' ),
	watchOptions = require( './grunt_options/watch' ),
	cleanOptions = require( './grunt_options/clean' ),
	copyOptions = require( './grunt_options/copy' );

// allowed/available environments
var TARGET_ENVIRONMENTS = {
	DEBUG: [ 'replace', 'jshint:new', 'jshint:old', 'jscs:new', 'jscs:old', 'browserify:dev', 'less:dev', 'concat:vendor' ],
	DEV: [ 'replace', 'jshint:new', 'jshint:old', 'jscs:new', 'jscs:old', 'browserify:dev', 'less:dev', 'concat:vendor' ],
	TEST: [ 'replace', 'jshint:new', 'jshint:old', 'jscs:new', 'jscs:old', 'browserify:prod', 'less:prod', 'uglify:prod', 'concat:vendor', 'uglify:vendor_prod' /*, 'htmlmin:prod' */ ],
	PROTOTYPE: [ 'replace', 'jshint:new', 'jshint:old', 'jscs:new', 'jscs:old', 'browserify:prod', 'less:prod', 'uglify:prod', 'concat:vendor', 'uglify:vendor_prod' /*, 'htmlmin:prod' */ ],
	PROD: [ 'replace', 'jshint:new', 'jshint:old', 'jscs:new', 'jscs:old', 'browserify:prod', 'less:prod', 'uglify:prod', 'concat:vendor', 'uglify:vendor_prod' /*, 'htmlmin:prod' */ ]
};

module.exports = function( grunt ) {

	var target = ( grunt.option( 'target' ) || '' ).toUpperCase(),
		deployDirectory = ( grunt.option( 'deploy' ) ),
		embeddable = ( grunt.option( 'embeddable' ) );

		if (!embeddable) {
			embeddable = "false";
		}

	// target parameter MUST be part of the specified TARGET_ENVIRONMENTS keys (properties)!!
	if ( _.contains( grunt.cli.tasks, 'build' ) ) {

		if ( !_.has( TARGET_ENVIRONMENTS, target ) ) {
			grunt.fail.fatal( 'add target parameter to grunt task! --> e.g. --target=PROD   Supported target environments: DEBUG, DEV, TEST, PROTOTYPE, PROD' );
		}

		// check if deployment directory exists
		if ( deployDirectory ) {

			grunt.log.ok( 'env path: ' + path.normalize( process.cwd(), deployDirectory ) );

			if ( !grunt.file.isDir( deployDirectory ) ) {
				grunt.fail.fatal( 'deployment directory does not exist!' );
			} else {
				// push additional tasks to task list
				//TARGET_ENVIRONMENTS[ target ].push( 'clean:cdc' );
				TARGET_ENVIRONMENTS[ target ].push( 'copy:cdc' );
			}
		}
	}

	// project configuration
	grunt.initConfig({
		concat: concatOptions,
		jshint: jshintOptions,
		jscs: jscsOptions,
		browserify: browserifyOptions,
		uglify: uglifyOptions,
		htmlmin: htmlminOptions,
		less: lessOptions,
		replace: replaceOptions,
		watch: watchOptions,
		//clean: cleanOptions( deployDirectory ),
		copy: copyOptions( deployDirectory )
	});

	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-browserify' );
	grunt.loadNpmTasks( 'grunt-jscs' );
	grunt.loadNpmTasks( 'grunt-replace' );

	grunt.registerTask('build', TARGET_ENVIRONMENTS[target]);
	grunt.registerTask('default', ['jscs']);

	// the dropfolder parameter if applied will drop a clean 'build' into the folder

};