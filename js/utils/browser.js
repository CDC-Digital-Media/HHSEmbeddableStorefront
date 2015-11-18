'use strict';

var url = require( 'url' ),
	_ = require( 'lodash' );

// uri is optional parameter, if not provided, it uses the current browser url
// function returns an object with LOWER CASED query parameter properties
exports.getQueryParams = function( uri ) {
	var query = url.parse( ( uri || document.location.href ), true ).query;

	// traverse all keys
	_.forEach( query, function( value, key ) {
		var lowerCasedKey = key.toLowerCase();
		// if key is not already lower cased attach it and delete the original
		if ( key !== lowerCasedKey ) {
			query[ lowerCasedKey ] = value;
			// delete original (case sensitive) key
			delete query[ key ];
		}
	});

	return query;
};