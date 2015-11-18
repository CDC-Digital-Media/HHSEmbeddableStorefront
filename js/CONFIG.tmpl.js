'use strict';

// server settings
var SERVER = {
    API_ROOT: '@@SERVER__API_ROOT',
	ROOT_URL: '/api/v2/resources',
	WEB_ROOT: '@@SERVER__WEB_ROOT',
	//API_KEY: 'apikey',
	ECARD_URL: '/ecard.html',
	CAROUSEL_COLLECTION_ID: '@@SERVER__CAROUSEL_COLLECTION_ID',
	SECURE_PROXY_URI: 'secureProxy.asmx/request',
	EMAIL_VALIDATOR: '@@SERVER__EMAIL_VALIDATOR',
	EMAIL_REQUEST_TEMPLATE: '@@SERVER__EMAIL_REQUEST_TEMPLATE',
	EMAIL_REPORT_TEMPLATE: '@@SERVER__EMAIL_REPORT_TEMPLATE',
	EMAIL_REQUEST_REFER: '@@SERVER__EMAIL_REQUEST_REFER',
	EMAIL_REPORT_REFER: '@@SERVER__EMAIL_REPORT_REFER',
	EMAIL_ENV: '@@SERVER__EMAIL_ENV'
};
module.exports.SERVER = SERVER;

var ANGULARJS = {
	// https://docs.angularjs.org/guide/production
	// Enable/Disable Debug Data
	DEBUG_ENABLED: @@ANGULARJS__DEBUG_ENABLED
};
module.exports.ANGULARJS = ANGULARJS;

// debug settings
var DEBUG = {

	// settings for debug.log functionality
	// possible values:
	//	true	turns logging on (suggested for development)
	//	false	turns logging off (suggested for production)
    LOGGING: @@DEBUG__LOGGING
};
module.exports.DEBUG = DEBUG;
var EMBEDDABLE = @@EMBEDDABLE;
module.exports.EMBEDDABLE = EMBEDDABLE;