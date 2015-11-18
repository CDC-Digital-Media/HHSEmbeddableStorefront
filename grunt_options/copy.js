'use strict';
module.exports = function( folder ) {

	return {
		cdc: {
			files: [
				{
					expand: true,
					src: [
						// css files
						'css/_bundle.css',
						// javascript files
						'app/_bundle.js',
						'js/libs/_bundle.js',

						//'app/atozTopicLetters/template.html',
						//'app/atozTopicList/template.html',
						//'app/topicNav/template.html',
						//'app/topicPage/template.html',
						'app/**/*.html',

						//
						'js/libs/jquery.min.js',
						'js/libs/flexslider.js',
						'js/plugins/htmlContent_tempPlugin.js',
						'js/widget.js',

						// images
						'images/**/*',
						'mediaAssets/**/*',
						// html
						'index.html',
						'ecard.html',
						'templates/**/*.html',
						'mailForms/**',
						// documents
						'docs/*.pdf'

						/*
						'**',
						'!TemplatePackage/**',
						'!node_modules/**',
						'!Storefront.*',
						'!obj/**',
						'!bin/**',
						'!_binRef/**',
						'!Properties/**',
						'!Web.*',
						'!share.*',
						'!secureProxy.*',
						'!build.xml',
						'!readme.txt',
						'!index.tmpl.html',
						'!AssemblyVersionInfo.cs'
						*/
					],
					dest: folder
				}
				//'css/**/*.less',
				//'js/**/*.js',
				//'Gruntfile.js',
				//'!js/_bundle*.js'
			],
			//tasks: [
			//	'browserify:dev',
			//	'less:dev'
			//],
			//options: {
			//	spawn: false
			//},
		}
	};
};