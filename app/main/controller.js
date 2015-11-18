var VERSION = require('../VERSION');
var TEMPLATE_PACKAGE_MAPPING = require('../config/SETTINGS');

var temp_app_loaded = false;

function Controller ( $rootScope, $scope, $location, $timeout, temp_app, userService ) {

	var self = this;
	this.$rootScope = $rootScope;
	this.$location = $location;
	this.pending = true;
	this.temp_app = temp_app;		

	this.VERSION = `${ VERSION.VERSION.MAJOR }.${ VERSION.VERSION.MINOR }.${ VERSION.VERSION.REVISION } (${ VERSION.VERSION.BUILD }) ${ VERSION.VERSION.DATE }`;

	this.CURRENT_DATE = VERSION.VERSION.DATE;
	this.templatePackageMapping = TEMPLATE_PACKAGE_MAPPING;
	// property for hiding (not generating) certain controls for ecards
	this.isEcard = false;
	this.userService = userService;
	this.userData  = this.userService.getUserData();
	this.loggedIn = (this.userData && this.userData.user.id) ? true : false;

	this.pending = false;
	
	$scope.$on('loggedIn', function(event) {
		self.userData  = self.userService.getUserData();
		self.loggedIn = self.userData ? true : false;
	});

	// COMPATIBILITY FUNCTIONALITY
	$scope.$on( '$viewContentLoaded', () => {
		//console.log( 'viewContentLoaded' );
	});

	$timeout( () => {
		if ( !temp_app_loaded ) {
			temp_app_loaded = true;
			require( '../../js/index.js' );
			temp_app.init();
		}
	}, 0 );

	// Decide which routes use Faceted Nav
	$scope.$on('$locationChangeStart', function(event) {
		self.isEcard = $location.$$path.indexOf( '/ecard' ) === 0;
		//self.useFacetedNav = $location.$$path.indexOf( '/results/' ) === 0 || $location.$$path.indexOf( '/media' ) === 0 || $location.$$path.indexOf( '/topics' ) === 0  || $location.$$path.indexOf( '/feeds' ) === 0;
	});

}


Controller.prototype.logout = function () {
	this.userService.deleteUserData();
	this.loggedIn = false;
	this.$rootScope.syndList = undefined;

	clearFiltering(this);
};

Controller.prototype.syndicationList = function (id) {
	if(id){
		window.location.hash = '/syndicationlist/' + id;
	}else{
		window.location.hash = '/syndicationlist/' + this.userData.syndicationLists[0].syndicationListId;
	}
};

Controller.prototype.homeclick = function ($event) {
	$event.preventDefault();

	clearFiltering(this);
};

function clearFiltering (self) {
	$.removeCookie('selectedMediaTypes');
	$.removeCookie('selectedTopics');
	$.removeCookie('selectedTopic'); // ??
	$.removeCookie('selectedSearch');

	self.selectedTypes = [];
	self.topicName = '';
	self.keyword = '';
	self.searchValue = '';
	
	self.$location.path('/results');
}

module.exports = Controller;