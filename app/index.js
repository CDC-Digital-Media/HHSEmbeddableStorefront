// how to setup browserify-shim for Angular 1.3:
// https://github.com/angular/angular.js/issues/9699
// https://github.com/thlorenz/browserify-shim

// services
var dataService = require('./dataService/index');
var userService = require('./userService/index');

var additionalResources = require('./additionalresources/index');
var atozTopicLetters = require('./atozTopicLetters/index');
var atozTopicList = require('./atozTopicList/index');
var carouselSlider = require('./carouselSlider/index');
var createContact = require('./newaccount/createContact/index');
var createLogin = require('./newaccount/createLogin/index');
var createOrganization = require('./newaccount/createOrganization/index');
var ecard = require('./ecard/index');
var embeddable = require('./embeddable/index');
var existingOrganization = require('./newaccount/existingOrganization/index');
var faq = require('./faq/index');
var landing = require('./landing/index');
var learnmore = require('./learnmore/index');
var login = require('./login/index');
var main = require('./main/index');
var media = require('./media/index');
var myaccount = require('./myaccount/index');
var navBasic = require('./navBasic/index');
var navFacet = require('./navFacet/index');
var newAccount = require('./newAccount/index');
var reportProblem = require('./reportProblem/index');
var requestSyndication = require('./requestSyndication/index');
var resetPassword = require('./resetPassword/index');
var resetPasswordRequest = require('./resetPasswordRequest/index');
var results = require('./results/index');
var search = require('./search/index');
var syndicationList = require('./syndicationList/index');
var topicNav = require('./topicNav/index');
var topicPage = require('./topicPage/index');
var topics = require('./topics/index');
var topSyndicated = require('./topSyndicated/index');
var usageGuidelines = require('./usageGuidelines/index');
var shareContent = require('./shareContent/index');
var successPage = require('./successPage/index');
var successPageRequest = require('./successPageRequest/index');

var temp_app = require('../js/app'),
	CONFIG = require('../js/CONFIG'),
	TEMPLATE_MAPPING = require('./config/SETTINGS').TEMPLATE_MAPPING,
	angular = require('angular'),
	storefront = angular.module('storefront', ['ngCookies', 'ngMessages', 'ngRoute', 'ngSanitize']);

var validator = require('validator');

require('angular-cookies');
require('angular-messages');
require('angular-route');
require('angular-sanitize');

storefront.factory('temp_app', function () {
	return temp_app;
});

storefront.factory("resultRouteBuilder", ['$routeParams', function ($routeParams) {
		return {
			getRoute: function () {

				if (CONFIG.EMBEDDABLE === true) {
					var embeddableUrl =  '/results/page/' + $routeParams.page + '/sort/' + $routeParams.sort + '/group/' + $routeParams.group;
					return (embeddableUrl);
				}

				//var selectedTopic = $.cookie('selectedTopic') ? $.cookie('selectedTopic') : '';
				var selectedTopics = $.cookie('selectedTopics') ? $.parseJSON($.cookie('selectedTopics')) : [];
				var selectedTypes = $.cookie('selectedMediaTypes') ? $.parseJSON($.cookie('selectedMediaTypes')) : [];
				var searchValue = $.cookie('selectedSearch') ? $.cookie('selectedSearch') : '';
				var url;
			
				if (selectedTypes.length === 0) {
					url = '/results/page/' + $routeParams.page + '/sort/desc/group/0';
				} else if (selectedTypes.length === 1) {
					url = '/landing/mediatype/' + selectedTypes[0];
					url += '/page/1';
				} else if (selectedTypes.length > 1) {
					url = '/results/page/1/sort/desc/group/0/mediatype/' + selectedTypes.join(',');
				}			

				if (selectedTopics.length > 0) {
					url += '/topic/' + selectedTopics.join(',');
				}
				if (searchValue !== '') {
					if (validator.isURL(searchValue)) {
						url += '/url/' + searchValue;
					} else {
						url += '/query/' + searchValue;
					}
				}

				return (url);

			}
	};
}]);


dataService(storefront);
userService(storefront);

additionalResources( storefront );
atozTopicLetters( storefront );
atozTopicList( storefront );
carouselSlider( storefront );
createContact( storefront );
createLogin( storefront );
createOrganization( storefront );
ecard( storefront );
embeddable( storefront );
existingOrganization( storefront );
faq(storefront);
landing(storefront);
learnmore(storefront);
login(storefront);
main(storefront);
media(storefront);
myaccount(storefront);
navBasic(storefront);
navFacet(storefront);
newAccount(storefront);
reportProblem(storefront);
requestSyndication(storefront);
resetPassword(storefront);
resetPasswordRequest(storefront);
results(storefront);
search(storefront);
syndicationList(storefront);
topicNav(storefront);
topicPage(storefront);
topics(storefront);
topSyndicated(storefront);
usageGuidelines(storefront);
shareContent(storefront);
successPage(storefront);
successPageRequest(storefront);

storefront.config(['$httpProvider', function($httpProvider) {

	delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);

storefront.config(['$routeProvider', '$locationProvider', '$compileProvider',

	function ($routeProvider, $locationProvider, $compileProvider) {

		// enable (true) disable (false) debug data for development/production
		$compileProvider.debugInfoEnabled(CONFIG.ANGULARJS.DEBUG_ENABLED);

		$routeProvider
			.when('/additionalresources', {
				controller: 'AdditionalResourcesController',
				controllerAs: 'additionalResources',
				templateUrl: TEMPLATE_MAPPING.ADDITIONAL_RESOURCES
			})
			.when('/atoztopiclist/:letter', {
				controller: 'AtozTopicListController',
				controllerAs: 'atozTopicList',
				templateUrl: TEMPLATE_MAPPING.ATOZ_TOPIC_LIST
			})
			.when('/ecard/:receiptId', {
				controller: 'EcardController',
				controllerAs: 'ecard',
				templateUrl: TEMPLATE_MAPPING.ECARD
			})
			.when( '/embeddable', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId/title/:title', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId/theme/:theme', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId/title/:title/theme/:theme', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId/controls/:controls', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId/title/:title/controls/:controls', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId/theme/:theme/controls/:controls', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when( '/embeddable/collectionId/:collectionId/title/:title/theme/:theme/controls/:controls', {
				controller: 'EmbeddableController',
				controllerAs: 'embeddable',
				templateUrl: 'app/embeddable/template.html'
			})
			.when('/faq', {
				controller: 'FAQController',
				controllerAs: 'faq',
				templateUrl: TEMPLATE_MAPPING.FAQ
			})
			.when('/landing/mediatype/:mediatype', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/url/:url*', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/page/:page', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/page/:page/url/:url*', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/page/:page/topic/:topic', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/page/:page/topic/:topic/url/:url*', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/page/:page/query/:query', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/page/:page/topic/:topic/query/:query', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/template.html'
			})
			.when('/landing/mediatype/:mediatype/:id', {
				controller: 'LandingController',
				controllerAs: 'landing',
				templateUrl: 'app/landing/detail.html'
			})
			.when('/learnmore', {
				controller: 'LearnMoreController',
				controllerAs: 'learnmore',
				templateUrl: 'app/learnmore/template.html'
			})
			.when('/login', {
				controller: 'LoginController',
				controllerAs: 'login',
				templateUrl: TEMPLATE_MAPPING.LOGIN
			})
			.when('/media/id/:id', {
				controller: 'MediaController',
				controllerAs: 'media',
				templateUrl: getMediaTemplate()
			})
			.when('/media/id/:id/embed/:embed', {
				controller: 'MediaController',
				controllerAs: 'media',
				templateUrl: getMediaTemplate()
			})
			.when('/myaccount', {
				controller: 'MyAccountController',
				controllerAs: 'myaccount',
				templateUrl: TEMPLATE_MAPPING.MYACCOUNT
			})
			.when('/newaccount', {
				controller: 'NewAccountController',
				controllerAs: 'newAccount',
				templateUrl: TEMPLATE_MAPPING.NEW_ACCOUNT
			})
			.when('/reportproblem', {
				controller: 'ReportProblemController',
				controllerAs: 'reportProblem',
				templateUrl: TEMPLATE_MAPPING.REPORT_PROBLEM
			})
			.when('/requestsyndication', {
				controller: 'RequestSyndicationController',
				controllerAs: 'requestSyndication',
				templateUrl: TEMPLATE_MAPPING.REQUEST_SYNDICATION
			})
			.when('/requestsyndication/url/:url*', {
				controller: 'RequestSyndicationController',
				controllerAs: 'requestSyndication',
				templateUrl: TEMPLATE_MAPPING.REQUEST_SYNDICATION
			})
			.when('/resetpassword', {
				controller: 'ResetPasswordController',
				controllerAs: 'resetPassword',
				templateUrl: TEMPLATE_MAPPING.RESET_PASSWORD
			})
			.when('/resetpasswordrequest', {
				controller: 'ResetPasswordRequestController',
				controllerAs: 'resetPasswordRequest',
				templateUrl: TEMPLATE_MAPPING.RESET_PASSWORD_REQUEST
			})
			.when('/results', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/url/:url*', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/url/:url*', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/topic/:topic', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/topic/:topic/url/:url*', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/mediatype/:mediatype', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/mediatype/:mediatype/url/:url*', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/mediatype/:mediatype/topic/:topic', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/mediatype/:mediatype/topic/:topic/url/:url*', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/query/:query', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/mediatype/:mediatype/query/:query', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/topic/:topic/query/:query', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/results/page/:page/sort/:sort/group/:group/mediatype/:mediatype/topic/:topic/query/:query', {
				controller: 'ResultsController',
				controllerAs: 'results',
				templateUrl: getResultsTemplate()
			})
			.when('/sharecontent/:url*', {
				controller: 'ShareContentController',
				controllerAs: 'shareContent',
				templateUrl: TEMPLATE_MAPPING.SHARE_CONTENT
			})
			.when('/success', {
				controller: 'SuccessPageController',
				controllerAs: 'successPage',
				templateUrl: TEMPLATE_MAPPING.SUBMIT_SUCCESS
			})
			.when('/successrequest', {
				controller: 'SuccessPageRequestController',
				controllerAs: 'successPageRequest',
				templateUrl: TEMPLATE_MAPPING.SUBMIT_SUCCESS_REQUEST
			})
			.when('/syndicationlist', {
				controller: 'SyndicationListController',
				controllerAs: 'syndicationList',
				templateUrl: TEMPLATE_MAPPING.SYNDICATION_LIST
			})
			.when('/syndicationlist/:id', {
				controller: 'SyndicationListController',
				controllerAs: 'syndicationList',
				templateUrl: TEMPLATE_MAPPING.SYNDICATION_LIST
			})
			.when('/syndicationlist/page/:page', {
				controller: 'SyndicationListController',
				controllerAs: 'syndicationList',
				templateUrl: TEMPLATE_MAPPING.SYNDICATION_LIST
			})
			.when('/syndicationlist/:id/page/:page', {
				controller: 'SyndicationListController',
				controllerAs: 'syndicationList',
				templateUrl: TEMPLATE_MAPPING.SYNDICATION_LIST
			})
			.when('/topicpage/:topicId', {
				controller: 'TopicPageController',
				controllerAs: 'topicPage',
				templateUrl: TEMPLATE_MAPPING.TOPIC_PAGE
			})
			.when('/topicpage/:topicId/mediatype/:mediatype', {
				controller: 'TopicPageController',
				controllerAs: 'topicPage',
				templateUrl: TEMPLATE_MAPPING.TOPIC_PAGE
			})
			.when('/topics', {
				controller: 'TopicsController',
				controllerAs: 'topics',
				templateUrl: TEMPLATE_MAPPING.TOPICS
			})
			.when('/usageguidelines', {
				controller: 'UsageGuidelinesController',
				controllerAs: 'usageGuidelines',
				templateUrl: TEMPLATE_MAPPING.USAGE_GUIDELINES
			})
			.when('/usageguidelines/:infoOnly', {
				controller: 'UsageGuidelinesController',
				controllerAs: 'usageGuidelines',
				templateUrl: TEMPLATE_MAPPING.USAGE_GUIDELINES
			})
			.otherwise({
				redirectTo: '/results'
			});

		// configure html5 to get links working
		// if you don't do this, you URLs will be base.com/#/home rather than base.com/home
		// $locationProvider.html5Mode( true );
	}
]);

function getResultsTemplate() {
	if (CONFIG.EMBEDDABLE === true) {
		return TEMPLATE_MAPPING.RESULTS_EMBEDDABLE;
	}
	return TEMPLATE_MAPPING.RESULTS;
}

function getMediaTemplate() {
	if (CONFIG.EMBEDDABLE === true) {
		return TEMPLATE_MAPPING.MEDIA_EMBEDDABLE;
	}
	return TEMPLATE_MAPPING.MEDIA;
}

function getFeedsDetailTemplate() {
	if (CONFIG.EMBEDDABLE === true) {
		return TEMPLATE_MAPPING.FEEDS_DETAIL_EMBEDDABLE;
	}
	return app/mt_feeds/detail.html;
}

// http://stackoverflow.com/questions/21292114/external-resource-not-being-loaded-by-angularjs
storefront.filter('trustedSource', ['$sce', function ($sce) {
	return function (src) {
		$sce.trustAsResourceUrl(src);
	};
}]);

storefront.filter('noBadData', function () {
	return function (item) {
		if (item === '' || item == '0' || item === undefined) {
			// returning nothing causes ng-show to be false
		} else {
			// item seems clean - return it untouched
			return item;
		}
	};
});

storefront.filter('convertExtToRss', function () {
	return function (item) {
		// Filters have a required check to see if 'item' exists 
		if (!item || !item.length) { return; }
		item = item.substr(0, item.lastIndexOf(".")) + ".rss";
		return item;
	};
});

// TEMPORARY
// handle global LINK click
storefront.directive('a', function () {
	return {
		restrict: 'E',
		link: function (scope, elem, attrs) {
			if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
				elem.on('click', function (event) {
					// prevent link click for above criteria
					event.preventDefault();
				});
			}
		}
	};
});

storefront.directive('scroll', ['$window', function ($window) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			angular.element($window).bind('scroll', function () {
				if (this.pageYOffset >= 300) {
					scope.showToTop = true;
					//console.log('Scrolled below header.');
				} else {
					scope.showToTop = false;
					//console.log('Header is in view.');
				}
				scope.$apply();
			});
		}
	};
}]);

storefront.filter('formatDate', function () {
	return function (zdate) {
		if (!zdate || !zdate.length) { return; }

		var date = new Date(zdate);
		return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
	};
});

storefront.filter('insertBreakingNonSpace', function () {
	return function (str) {
		str = str.split("/").join("/&#8203;");
		return str;
	};
});

