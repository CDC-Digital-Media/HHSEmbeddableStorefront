var _SETTINGS = require( '../../js/SETTINGS' ),
	SETTINGS = require('../config/SETTINGS'),
	validator = require('validator');


function Controller(searchService, $rootScope, $scope, $location, $routeParams, temp_app) {

	var self = this;

	this.$rootScope = $rootScope;
	this.$scope = $scope;
	this.$location = $location;
	this.$routeParams = $routeParams;

	this.temp_app = temp_app;
	this.template = SETTINGS.TEMPLATE_MAPPING.SEARCH;

	if (this.$routeParams.query) {
		this.searchValue = this.$routeParams.query;
	}

	searchService.get().then(function(value) {
		self.data = value.data.map(function(value) {
			value.dropdownCssClass = _SETTINGS.MEDIA_ICONS[value.name.toUpperCase()];
			return value;
		});

		if (self.$routeParams.mediatype) {
			self.buttonText = $.grep(self.data, function (mt) {
				return mt.name == self.$routeParams.mediatype;
			})[0].description;
		}
		else {
			self.buttonText = 'All Media Types';
		}
	});
}

Controller.prototype.click = function (name, description, $event) {
	var url =  '/results/page/1/sort/desc/group/0/mediatype/' + name;	
	//this.$scope.$apply(this.$location.path(url));
	this.$location.path(url);
	this.$rootScope.$broadcast('mediaTypeChanged', name);
};

Controller.prototype.go = function () {

	$.cookie('selectedSearch', this.searchValue);

	var url = '/results/page/1/sort/desc/group/0';

	if (this.$routeParams.mediatype) {
		url += '/mediatype/' + this.$routeParams.mediatype;
	}
	if (this.$routeParams.topic) {
		url += '/topic/' + this.$routeParams.topic;
	}
	if (this.searchValue) {

		if (validator.isURL(this.searchValue)) {
			url += '/url/' + this.searchValue;
		}else {
			url += '/query/' + this.searchValue;
		}		
	}
	//this.$scope.$apply(this.$location.path(url));
	this.$location.path(url);
};


module.exports = Controller;