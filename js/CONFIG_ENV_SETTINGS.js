/// <reference path="../mailForms/reportAProblem_refer.htm" />
/// <reference path="../mailForms/reportAProblem_refer.htm" />
/// <reference path="../mailForms/reportAProblem_refer.htm" />
'use strict';

var SETTINGS = {
	SERVER: {
		API_ROOT: {
			DEBUG:		'https://.....[devApiServer].....',
			DEV:		'https://api.digitalmedia.hhs.gov',
			TEST:		'https://.....[testApiServer].....',
			PROD:		'https://api.digitalmedia.hhs.gov',
			PROTOTYPE:	'https://.....[productionServer].....'
		},
		WEB_ROOT: {
			DEBUG:		'/',
			DEV:		'/dev_storefront',
			TEST:		'/test_storefront',
			PROD:		'/medialibrary',
			PROTOTYPE:	'/storefront'
		},
		CAROUSEL_COLLECTION_ID: {
			DEBUG:		'138929',
			DEV:		'138929',
			TEST:		'122999',
			PROD:		'121094',
			PROTOTYPE:	'119734'
		},
		EMAIL_VALIDATOR: {
			DEBUG:		'//.....[devServer]...../dev_emailforms/validate',
			DEV:		'//.....[devServer]...../dev_emailforms/validate',
			TEST:		'//.....[devServer]...../dev_emailforms/validate',
			PROD:       '//.....[productionToolsServer]...../emailforms/validate',
			PROTOTYPE:  '//.....[productionServer]...../emailforms/validate'
		},
		EMAIL_REPORT_TEMPLATE: {
			DEBUG:		'//.....[devServer]...../dev_storefront/mailForms/reportAProblem_template.txt',
			DEV:		'//.....[devServer]...../dev_storefront/mailForms/reportAProblem_template.txt',
			TEST:		'//.....[devServer]...../test_storefront/mailForms/reportAProblem_template.txt',
			PROD:		'//.....[productionToolsServer]...../medialibrary/mailForms/reportAProblem_template.txt',
			PROTOTYPE:  '//.....[productionServer]...../storefront/mailForms/reportAProblem_template.txt'
		},
		EMAIL_REPORT_REFER: {
			DEBUG:		'//.....[devServer]...../dev_storefront/mailForms/reportAProblem_refer.htm',
			DEV:		'//.....[devServer]...../dev_storefront/mailForms/reportAProblem_refer.htm',
			TEST:		'//.....[devServer]...../test_storefront/mailForms/reportAProblem_refer.htm',
			//PROD:		'//.....[productionToolsServer]...../medialibrary/mailForms/reportAProblem_refer.htm',
			PROD:		'//.....[productionToolsServer]...../medialibrary/index.aspx#/success',
			//PROTOTYPE:	'//.....[productionServer]...../storefront/mailForms/reportAProblem_refer.htm'
			PROTOTYPE:	'//.....[productionServer]...../storefront/index.aspx#/success'
		},
		EMAIL_REQUEST_TEMPLATE: {
			DEBUG:		'//.....[devServer]...../dev_storefront/mailForms/requestAPage_template.txt',
			DEV:		'//.....[devServer]...../dev_storefront/mailForms/requestAPage_template.txt',
			TEST:		'//.....[devServer]...../test_storefront/mailForms/requestAPage_template.txt',
			PROD:		'//.....[productionToolsServer]...../medialibrary/mailForms/requestAPage_template.txt',
			PROTOTYPE:	'//.....[productionServer]...../storefront/mailForms/requestAPage_template.txt'
		},
		EMAIL_REQUEST_REFER: {
			DEBUG:		'//.....[devServer]...../dev_storefront/mailForms/requestAPage_refer.htm',
			DEV:		'//.....[devServer]...../dev_storefront/mailForms/requestAPage_refer.htm',
			TEST:		'//.....[devServer]...../test_storefront/mailForms/requestAPage_refer.htm',
			//PROD:		'//.....[productionToolsServer]...../medialibrary/mailForms/requestAPage_refer.htm',
			PROD:		'//.....[productionToolsServer]...../medialibrary/index.aspx#/successrequest',
			//PROTOTYPE:	'//.....[productionServer]...../storefront/mailForms/requestAPage_refer.htm'
			PROTOTYPE: '//.....[productionServer]...../storefront/index.aspx#/successrequest'
		},
		EMAIL_ENV: {
			DEBUG:      'DEV',
			DEV:        'DEV',
			TEST:       'DEV',
			PROD:       'PROD',
			PROTOTYPE:  'PROD'
		}
	},

	ANGULARJS: {
		DEBUG_ENABLED: {
			DEBUG:		true,
			DEV:		true,
			TEST:		false,
			PROD:		false,
			PROTOTYPE:	false
		}
	},

	DEBUG: {
		LOGGING: {
			DEBUG:		true,
			DEV:		true,
			TEST:		false,
			PROD:		false,
			PROTOTYPE:	false
		}
	}
};

module.exports.SETTINGS = SETTINGS;
