'use strict';

var CONFIG = require( '../CONFIG' ),
	misc = require( './misc' );

var _styles = {
		error: 'color:yellow; background:red;',
		warn: 'color:yellow; background:blue;'
	};

function out( func, msg, style ) {

	var formatSpecifier;

	// if console doesn't exist or console.log is turned off by CONFIG
	if ( window.console === undefined || !CONFIG.DEBUG.LOGGING ) return;

	formatSpecifier = ( style ) ? '%c' : '';

	console[ func ]( formatSpecifier + misc.getUTCTime() + ' - ' + msg, style || '' );
}

exports.error = function( msg ) {
	out( 'error', msg, _styles.error );
};

exports.warn = function( msg ) {
	out( 'warn', msg, _styles.warn );
};

exports.log = function( msg, style ) {
	out( 'log', msg, style );
};