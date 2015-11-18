'use strict';

var _debug = require( './debug' ),
	_contentType = 'application/json; charset=utf-8';

function _ajax( options, next ) {

	$.ajax( options )
		.done( function ( data ) {
			return next( null, data );
		})
		.fail( function ( jqXHR, settings, exception ) {
			return next( exception );
		})
		.always( function() {
			_debug.log( this.type + ': ' + this.url );
		});
}

exports.getJsonP = function( url, params, next ) {
	return _ajax({ type: 'GET', url: url, data: params, contentType: _contentType, dataType: 'jsonp' }, next );
};

exports.post = function( url, data, next ) {
	return _ajax({ type: 'POST', url: url, data: data, contentType: _contentType, dataType: 'json' }, next );
};

exports.loadTemplate = function( url, next ) {
	return _ajax({ type: 'GET', url: url, dataType: 'html' }, next );
};