'use strict';

var _ = require( 'lodash' ),
	_ajax = require( './utils' ).ajax,
	_SERVER = require( './CONFIG' ).SERVER;

function _getJsonP( path, params, next ) {

	var url = _SERVER.API_ROOT + _SERVER.ROOT_URL + path;

	params = params || {};

	// apply api key
	// jQuery omit the parameters if undefined
	params.apikey = _SERVER.API_KEY;

	// add application wide parameters
	// params.language = 'english';

	return _ajax.getJsonP( url, params, function( err, data ) {
		return next( err, data.results, data.meta );
	});
}

function _post( httpMethod, path, data, next ) {

	// apply api key
	// note: this only works if no other query string parameters have been applied to 'path'!
	var apikeyParam = ( _SERVER.API_KEY ) ? '?apikey=' + _SERVER.API_KEY : '',
		url = _SERVER.API_ROOT + _SERVER.ROOT_URL + path + apikeyParam,
		payload = {
			url: url,
			data: JSON.stringify( data ),
			httpMethod: httpMethod
		};

	return _ajax.post( _SERVER.SECURE_PROXY_URI, JSON.stringify( payload ), function( err, data ) {
		var jsonData = JSON.parse( data.d );
		return next( null, jsonData.results, jsonData.meta );
	});
}

exports.getTopicIndex = function (tId, next) {

	var path = '/topics/' + tId,
		params = {
			showchild: true
		};

	return _getJsonP(path, params, function (err, data) {

		var list = _.chain(data)
				.forEach(function (value) {

					var subItems = _.chain(value.items)
						.filter(function (value) {
							return value.mediaUsageCount > 0;
						})
						.value();

					value.items = subItems;
				})
				.value();

		return next(null, list);

	});
};

exports.getAccountMedia = function( addlParams, next ) {

	var path = '/media',
		params = {
			pagenum: 1,
			max: 10
		};

	// merge parameters
	params = _.merge( params, addlParams );

	return _getJsonP( path, params, next );
};

exports.getMediaTypes = function(next) {

	var path = '/mediatypes',
		params = {
			// sort default is displayordinal, but apply explicitly anyways just in case if default changes
			sort: 'displayordinal'
		};

	return _getJsonP( path, params, function ( err, data ) {

		if ( err ) return next( err );

		// add 'All' (doesn't exist on service call)
		data.unshift( { name: '', description: 'All Media Types' } );

		// CDC.Global.variables.mediaTypes = data;

		return next( null, data );
	});
};

exports.getMedia_Search_Temp = function( params, next ) {

	var path = '/media';
		//params = {
		//	sourceUrl: null
		//};

	return _getJsonP(path, params, next);
};


exports.getMedia = function( addlParams, next ) {

	var path = '/media',
		params = {
			max: 12
		};

	// merge parameters
	params = _.merge( params, addlParams );

	return _getJsonP( path, params, next );
};

exports.getMediaItem = function(mediaId, next) {

	var path = '/media/' + mediaId;

	return _getJsonP(path, null, function (err, data) {
		return next(err, data[0]);
	});
};

exports.getMediaSyndicate = function(mediaId, addlParams, next) {

	var path = '/media/' + mediaId + '/syndicate.json'; //Added .json file extension for HHS API support

	return _getJsonP(path, addlParams, next);
};

exports.getMediaChildren = function(mediaId, next) {

	var path = '/media/' + mediaId,
		params = {
			showchildlevel: 1
		};

	return _getJsonP(path, params, function (err, data) {
		return next(err, data[0].children);
	});
};

exports.getMediaChildrenLevel2 = function(mediaId, next) {

	var path = '/media/' + mediaId,
		params = {
			showchildlevel: 2
		};

	return _getJsonP(path, params, function (err, data) {
		return next(err, data[0]);
	});
};

exports.getMediaChildrenWithParent = function(mediaId, next) {

	var path = '/media/' + mediaId,
		params = {
			showchildlevel: 1,
			showparentlevel: 1
		};

	return _getJsonP(path, params, function (err, data) {
		return next(err, data[0]);
	});
};

exports.getSyndicationIds = function(listGuid, next) {

	var path = '/syndicationlists/' + listGuid;

	_getJsonP(path, null, function (err, data) {

		if (err) return next(err);

		var ids = _.pluck(data.media, 'mediaId');

		return next(null, ids);
	});
};

exports.addMediaToSyndicationList = function(data, listGuid, next) {

	var path = '/syndicationlists/' + listGuid + '/media';

	return _post('POST', path, data, next);
};

exports.removeMediaToSyndicationList = function(data, listGuid, next) {

	var path = '/syndicationlists/' + listGuid + '/media';

	return _post('DELETE', path, data, next);
};

exports.sendEcard = function(data, mediaId, next) {

	var path = '/ecards/' + mediaId + '/send';

	return _post('POST', path, data, next);
};

exports.agreeToUsageGuidelines = function(data, userId, next) {

	var path = '/users/' + userId + '/usageagreements';

	return _post('PUT', path, data, next);
};

exports.getTagInfo = function(id, next) {

	// getTagInfo( id ) {
	// 	var path = '/tags/' + id
	// 	return _getJsonP( path );
	// },

	var path = '/tags/' + id;

	_getJsonP(path, null, function (err, data) {

		if (err) return next(err);
		return next(null, data);
	});
};