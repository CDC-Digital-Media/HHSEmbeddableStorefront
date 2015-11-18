'use strict';

// server settings
var SERVER = {
    API_ROOT: 'https://api.digitalmedia.hhs.gov',
	ROOT_URL: '/api/v2/resources',
	WEB_ROOT: '/medialibrary',
	//API_KEY: 'apikey',
	ECARD_URL: '/ecard.html',
	CAROUSEL_COLLECTION_ID: '121094',
	SECURE_PROXY_URI: 'secureProxy.asmx/request',
	EMAIL_VALIDATOR: '//.....[productionToolsServer]...../emailforms/validate',
	EMAIL_REQUEST_TEMPLATE: '//.....[productionToolsServer]...../medialibrary/mailForms/requestAPage_template.txt',
	EMAIL_REPORT_TEMPLATE: '//.....[productionToolsServer]...../medialibrary/mailForms/reportAProblem_template.txt',
	EMAIL_REQUEST_REFER: '//.....[productionToolsServer]...../medialibrary/index.aspx#/successrequest',
	EMAIL_REPORT_REFER: '//.....[productionToolsServer]...../medialibrary/index.aspx#/success',
	EMAIL_ENV: 'PROD'
};
module.exports.SERVER = SERVER;

var ANGULARJS = {
	// https://docs.angularjs.org/guide/production
	// Enable/Disable Debug Data
	DEBUG_ENABLED: false
};
module.exports.ANGULARJS = ANGULARJS;

// debug settings
var DEBUG = {

	// settings for debug.log functionality
	// possible values:
	//	true	turns logging on (suggested for development)
	//	false	turns logging off (suggested for production)
    LOGGING: false
};
module.exports.DEBUG = DEBUG;
var EMBEDDABLE = true;
module.exports.EMBEDDABLE = EMBEDDABLE;
