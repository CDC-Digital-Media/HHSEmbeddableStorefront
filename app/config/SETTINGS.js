var TEMPLATE_MAPPING = {
	ADDITIONAL_RESOURCES: 'app/additionalresources/template.html',
	ATOZ_TOPIC_LETTERS: 'app/atoztopicletters/template.html',
	ATOZ_TOPIC_LIST: 'app/atoztopiclist/template.html',
	CAROUSEL_SLIDER: 'app/carouselslider/template.html',
	CREATE_CONTACT: 'app/newaccount/createcontact/template.html',
	CREATE_LOGIN: 'app/newaccount/createlogin/template.html',
	CREATE_ORGANIZATION: 'app/newaccount/createorganization/template.html',
	ECARD: 'app/ecard/template.html',
	EXISTING_ORGANIZATION: 'app/newaccount/existingorganization/template.html',
	FAQ: 'app/faq/template.html',
	LOGIN: 'app/login/template.html',
	MEDIA: 'app/media/template.html',
	MEDIA_EMBEDDABLE: 'app/media/template_embeddable.html',
	MYACCOUNT: 'app/myaccount/template.html',
	NAV_BASIC: 'app/navbasic/template.html',
	NAV_FACET: 'app/navfacet/template.html',
	NEW_ACCOUNT: 'app/newaccount/template.html',
	REPORT_PROBLEM: 'app/reportproblem/template.html',
	RESET_PASSWORD: 'app/resetpassword/template.html',
	RESET_PASSWORD_REQUEST: 'app/resetpasswordrequest/template.html',
	REQUEST_SYNDICATION: 'app/requestsyndication/template.html',
	RESULTS: 'app/results/template.html',
	RESULTS_EMBEDDABLE: 'app/results/template_embeddable.html',
	RESULTS_TILE: 'app/results/tile.html',
	SEARCH: 'app/search/template.html',
	SYNDICATION_LIST: 'app/syndicationlist/template.html',
	TOPIC_NAV: 'app/topicnav/template.html',
	TOPIC_PAGE: 'app/topicpage/template.html',
	TOPICS: 'app/topics/template.html',
	TOP_SYNDICATED: 'app/topsyndicated/template.html',
	USAGE_GUIDELINES: 'app/usageguidelines/template.html',
	SHARE_CONTENT: 'app/shareContent/template.html',
	SUBMIT_SUCCESS: 'app/successPage/template.html',
	SUBMIT_SUCCESS_REQUEST: 'app/successPageRequest/template.html'
};
module.exports.TEMPLATE_MAPPING = TEMPLATE_MAPPING;

var TEMPLATE_PACKAGE_MAPPING = {
	'skipMenuNav': '/TemplatePackage/3.0/includes/skipMenuNav.html',
	'chromeFrame': '/TemplatePackage/3.0/includes/chromeFrame.html',
	'logo': '/TemplatePackage/3.0/includes/logo.html',
	'menu': '/TemplatePackage/3.0/includes/menu.html',
	//'searchBottom': '/TemplatePackage/3.0/includes/searchBottom.html',
	'emergency': '/TemplatePackage/3.0/includes/emergency.html',
	'noscript': '/TemplatePackage/3.0/includes/noscript.html',
	'socialMediaShare': '/TemplatePackage/3.0/includes/socialMediaShare.html',
	'pluginsLegend': '/TemplatePackage/3.0/includes/pluginsLegend.html',
	'datestamp': '/TemplatePackage/3.0/includes/datestamp.html',
	'contentSource': '/TemplatePackage/3.0/local/includes/contentSource.html',
	'footerSocialMedia': '/TemplatePackage/3.0/includes/footerSocialMedia.html',
	'footerLogos': '/TemplatePackage/3.0/includes/footerLogos.html',
	'footerCdcLinks': '/TemplatePackage/3.0/includes/footerCdcLinks.html',
	'footerGlobalContact': '/TemplatePackage/3.0/includes/footerGlobalContact.html'
};
module.exports.TEMPLATE_PACKAGE_MAPPING = TEMPLATE_PACKAGE_MAPPING;

var METRICS_INTERACTIONS = {
	ACTION: {
		TOPIC_CLICK: 'TopicClick',
		MAINNAV_EXPAND: 'Expanded'
	},
	LOCATION: {
		TOPSYNDICATED: 'TopSyndicated',
		MAINNAV: 'MainNav',
		CAROUSEL: 'Carousel',
		SEARCHRESULTS: 'SearchResults',
		DETAILPAGE: 'DetailPage',
		GETHELP: 'GetHelp'
	}
};
module.exports.METRICS_INTERACTIONS = METRICS_INTERACTIONS;

var LOCATION = {
	CONTINENT: {
		NORTH_AMERICA: 6255149
	},
	COUNTRY: {
		USA: 6252001
	}
};
module.exports.LOCATION = LOCATION;

var ORGANIZATION_TYPE = {
	OTHER: 8
};
module.exports.ORGANIZATION_TYPE = ORGANIZATION_TYPE;

var CREATE_ORGANIZATION = {
	MAX_ITEMS: 5
};
module.exports.CREATE_ORGANIZATION = CREATE_ORGANIZATION;

var REQUEST_SYNDICATION = {
	MAX_ITEMS: 10
};
module.exports.REQUEST_SYNDICATION = REQUEST_SYNDICATION;

var NAVIGATION = {
	NUMBER_OF_SUBITEMS: 9
};
module.exports.NAVIGATION = NAVIGATION;

var TOPIC_PAGE = {
	COLUMNS: 2
};
module.exports.TOPIC_PAGE = TOPIC_PAGE;

var TOP_SYNDICATED = {
	NUMBER_OF_ITEMS: 5
};
module.exports.TOP_SYNDICATED = TOP_SYNDICATED;

module.exports.EMBEDDABLE_DEFAULT_TITLE = "Public Health Media Library";