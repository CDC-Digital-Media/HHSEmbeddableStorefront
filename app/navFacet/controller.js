var SETTINGS = require('../config/SETTINGS'),
	validator = require('validator');

function Controller($rootScope, $routeParams, $scope, $location, resultRouteBuilder, navFacetService) {


	this.$rootScope = $rootScope;
	this.$routeParams = $routeParams;
	this.$scope = $scope;
	this.$location = $location;
	this.resultRouteBuilder = resultRouteBuilder;
	this.navFacetService = navFacetService;
	this.template = SETTINGS.TEMPLATE_MAPPING.NAV_FACET;
	this.selectedTypes = [];
	this.keyword = '';
	this.topics = [];

	var self = this;

	self.expanded = false;

	self.navFacetService.get().then((function (response) {
		var data = response.data;
		self.mediaTypes = data;
	}));

	if (self.selectedTypes.length === 0 && self.$routeParams.mediatype) {
		self.selectedTypes.push(self.$routeParams.mediatype);
	}


	updateCriteriaBlock(self);
	$scope.$on('$routeChangeStart', function(next, current) { 
		updateCriteriaBlock(self);
	});

}

var updateCriteriaBlock = function(self){
		self.selectedTopics = $.cookie('selectedTopics') ?  $.parseJSON($.cookie('selectedTopics')) : [];
		self.selectedTypes = $.cookie('selectedMediaTypes') ?  $.parseJSON($.cookie('selectedMediaTypes')) : [];
		self.keyword = $.cookie('selectedSearch') ? $.cookie('selectedSearch') : '';

		$(self.selectedTopics).each(function (index, item) {
			if ($.grep(self.topics, function(t) {return t.id == item;}).length === 0){
				self.navFacetService.getTagInfo(item).then( function({ data, meta }){
					if ($.grep(self.topics, function(t) {return t.id == item;}).length === 0){
						self.topics.push({ "name": data[0].name, "id": item });
					}
				});			
			}
		});

};

Controller.prototype.mediaTypeClick = function (item, $event) {
	if (this.selectedTypes.indexOf(item) > -1) {
		this.selectedTypes.splice(this.selectedTypes.indexOf(item), 1);
	} else {
		// TEMP DISABLING OF MULTISELECT MEDIATYPES
		// destroy object to lock into single select
		this.selectedTypes = [];
		this.selectedTypes.push(item);
	}

	$.cookie('selectedMediaTypes', JSON.stringify(this.selectedTypes));
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.clearClick = function ($event) {
	$event.preventDefault();

	$.removeCookie('selectedMediaTypes');
	$.removeCookie('selectedTopics');
	$.removeCookie('selectedSearch');

	this.selectedTypes = [];
	this.topics = [];
	this.keyword = '';
	this.searchValue = '';

	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.clearTopicClick = function (id, $event) {
	$event.preventDefault();
	this.topics = $.grep(this.topics, function(t) {return t.id != id;});
	this.selectedTopics = $.map(this.topics, function(o,i){return o.id;});

	$.cookie('selectedTopics', JSON.stringify(this.selectedTopics));
	
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.clearKeywordClick = function ($event) {
	$event.preventDefault();

	$.removeCookie('selectedSearch');

	this.keyword = '';
	this.searchValue = '';

	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.homeclick = function ($event) {
	$event.preventDefault();
	
	$.removeCookie('selectedMediaTypes');
	$.removeCookie('selectedTopics');
	$.removeCookie('selectedSearch');

	this.selectedTypes = [];
	this.topicName = '';
	this.keyword = '';
	this.searchValue = '';
	
	this.$location.path('/results');
};

Controller.prototype.search = function () {
	$.cookie('selectedSearch', this.searchValue);
	this.$location.path(this.resultRouteBuilder.getRoute());
};

module.exports = Controller;