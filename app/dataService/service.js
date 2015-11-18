// TEMP (change CONFIG location!)
var _SERVER = require( '../../js/CONFIG' ).SERVER;

module.exports = function ( $http ) {


	function _getJsonP( path, params ) {

		var url = _SERVER.API_ROOT + _SERVER.ROOT_URL + path;

		// apply api key (undefined parameters will be omitted)
		params.apikey = _SERVER.API_KEY;

		// add application wide parameters
		// params.language = 'english';
		
		// angular expects a name for the jsonp callback function
		params.callback = 'JSON_CALLBACK';
		
		return $http.jsonp( url, { params } ).then( ({ data: { results, meta } }) => ({ data: results, meta }) );
	}

	function _post( httpMethod, path, data ) {

		var url = _SERVER.API_ROOT + _SERVER.ROOT_URL + path,
			payload = { url, data: JSON.stringify( data ), httpMethod };

		return $http.post( _SERVER.SECURE_PROXY_URI, JSON.stringify( payload ) ).then( ({ data: { d } }) => {
			var { results, meta } = JSON.parse( d );
			return ({ data: results, meta });
		});
	}

	return {

		getEcard: function ( receiptId ) {

			var path = '/ecards/'+ receiptId +'/view';

			return _getJsonP( path, {} );
		},

		getAccountMedia: function( params, next ) {


			//https://.....[devApiServer]...../api/v2/resources/media?max=10&pagenum=1&syndicationlistid=3a9db6ab-2326-45e3-8ccb-4ee3966c629f
			//&fields=id,mediatype,name,description,datepublished,thumbnailurl&sort=-SyndicationListModifiedDateTime

			var path = '/media';

			return _getJsonP( path, params, next );
		},

		getAtoZList: function () {

			var path = '/atoz',
				params = { valueset: 'topics', language: 'english' };

			return _getJsonP( path, params );
		},

		getTopicChildren: function () {

			var path = '/topics',
				params = { max: 0, showchild: true };

			return _getJsonP( path, params );
		},

		getTopicByMediaType: function ( mediatype ) {

			var path = '/topics',
				params = { max: 0, showchild: true, mediatype };

			return _getJsonP( path, params );
		},

		getTopicIndex: function ( id ) {

			var path = '/topics/' + id,
				params = { showchild: true };

			return _getJsonP( path, params );
		},

		getTagInfo: function ( id ) {

			var path = '/tags/' + id;

			return _getJsonP( path, {} );
		},

		getTopSyndicated: function ( items ) {

			var path = '/media',
				params = { max: items, sort: '-popularity' };

			return _getJsonP( path, params );
		},

		searchMedia : function( params, next ) {

			var path = '/media';
			//console.log('search parms: ' + params);
			return _getJsonP(path, params, next);
		},

		getMedia: function (pg) {

			var path = '/media',
				params = { max: 12, pagenum: pg };

			return _getJsonP( path, params );
		},

		getMediaByType: function ( params) {

			var path = '/media';

			return _getJsonP( path, params );
		},

		getMediaChildren: function ( mediaId ) {

			var path = '/media/' + mediaId,
				params = { showchildlevel: 1 };

			return _getJsonP( path, params );
		},

		getMediaItem: function (mediaId) {

			var path = '/media/' + mediaId;

			return _getJsonP(path, {});
		},

		getMediaItemEmbedCode: function (mediaId) {

			var path = '/media/' + mediaId + '/embed.json';

			return _getJsonP(path, {});
		},

		getMediaTypes: function () {

			var path = '/mediatypes',
				// sort default is displayordinal, but apply explicitly anyways just in case if default changes
				params = { sort: 'displayordinal' };

			return _getJsonP( path, params );
		},

		getOrganizationTypes: function () {

			var path = '/organizationtypes';

			return _getJsonP( path, {} );
		},

		getLocations: function ( id ) {

			var path = '/locations/' + id,
				params = { max: 0 };

			return _getJsonP( path, params );
		},

		getOrganization: function ( id ) {

			var path = '/organizations/' + id;

			return _getJsonP( path, {} );
		},

		getOrganizations: function () {

			var path = '/organizations',
				params = { max: 0 };

			return _getJsonP( path, params );
		},

		agreeToUsageGuidelines: function ( data, id ) {

			var path = '/users/'+ id +'/usageagreements';

			return _post( 'PUT', path, data );
		},

		loginUser: function ( data ) {

			var path = '/logins';

			return _post( 'POST', path, data );
		},

		registerUser: function ( data ) {

			var path = '/users';

			return _post( 'POST', path, data );
		},

		updateUser: function ( data, id ) {

			var path = '/users/' + id;

			return _post( 'PUT', path, data );
		},

		resetUserPassword: function ( data ) {

			var path = '/reset_user_passwords';

			return _post( 'POST', path, data );
		},

		updateUserPassword: function ( data ) {

			var path = '/update_user_passwords';

			return _post( 'POST', path, data );
		},

		addMediaToSyndicationList : function(data, listGuid, next) {

			var path = '/syndicationlists/' + listGuid + '/media';

			return _post('POST', path, data, next);
		},

		removeMediaFromSyndicationList : function(data, listGuid, next) {

			var path = '/syndicationlists/' + listGuid + '/media';

			return _post('DELETE', path, data, next);
		},

		validateEmail: function ( data ) {
			// { email: 'senderEmail1@email' }
			var path = '/user_email_exists';

			return _post( 'POST', path, data );
		},

		urlExists: function ( url ) {
			//https://.....[productionServer]...../api/v2/resources/media?sourceUrl=http://www......[domain]...../flu			

			var path = '/media?Url=' + url,
				params = {};
			
			return _getJsonP( path, params );
		}

	};
};
