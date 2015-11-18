'use strict';

// BEGIN ----- overwrite (annoying) stuff from the TEMPLATE PACKAGE here ---------->
if ( window.log ) window.log = function() {};
//window.CDC = window.CDC || {};
//window.CDC.callInit = false;
// END


// #DN delete!!! leftover stuff from index.html
//var myLocation = document.location.toString().toLowerCase();
//if (myLocation.indexOf('http://') === 0 && myLocation.indexOf('localhost') === -1) document.location = myLocation.replace('http://', 'https://');

// TEMP
//
// POLYFILLS ---->

// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
if ( !String.prototype.trim ) {
	// Make sure we trim BOM and NBSP
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	String.prototype.trim = function () {
		return this.replace( rtrim, '' );
	};
}


// TEMP
// require( './app' ).init();