var SETTINGS = require('../config/SETTINGS');

function Controller($rootScope, $routeParams, $scope, $location, resultRouteBuilder, navBasicService) {

	this.$rootScope = $rootScope;
	this.$routeParams = $routeParams;
	this.$scope = $scope;
	this.$location = $location;
	this.resultRouteBuilder = resultRouteBuilder;
	this.navBasicService = navBasicService;
	this.template = SETTINGS.TEMPLATE_MAPPING.NAV_BASIC;

	var self = this;


	self.expanded = false;
	self.navBasicService.get().then((function (response) {
		var data = response.data;
		self.mediaTypes = data;
	}));
}

Controller.prototype.mediaTypeClick = function (name, desc, $event) {
	$.cookie('selectedMediaTypes', JSON.stringify([name]));
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.homeclick = function ($event) {
	$event.preventDefault();

	$.removeCookie('selectedMediaTypes');
	$.removeCookie('selectedTopic');
	$.removeCookie('selectedSearch');

	this.selectedTypes = [];
	this.topicName = '';
	this.keyword = '';
	this.searchValue = '';

	this.$location.path('/results');
};


module.exports = Controller;