var SETTINGS = require( '../config/SETTINGS' );

function transform( data ) {
	var arrTopics = data
		.filter( value => value.name != 'Other' )
		.map( value => {
			value.collapsed = false;
			return value;
		});

	var arrOther = data
		.filter( value => value.name == 'Other' )
		.map( value => {
			value.collapsed = false;
			return value;
		})[0];

	// place the other topic at the bottom if it's available
	if (typeof arrOther !== 'undefined') {
		arrTopics.push(arrOther);
	}	

	return arrTopics;
}

function Controller ( $rootScope, $routeParams, $scope, $location, topicNavService, temp_app ) {


	this.$rootScope = $rootScope;
	this.$routeParams = $routeParams;
	this.$scope = $scope;
	this.$location = $location;
	this.topicNavService = topicNavService;
	this.temp_app = temp_app;
	this.template = SETTINGS.TEMPLATE_MAPPING.TOPIC_NAV;
	this.NUMBER_OF_SUBITEMS = SETTINGS.NAVIGATION.NUMBER_OF_SUBITEMS;	
	this.mediaType = this.$routeParams.mediatype !== undefined ? this.$routeParams.mediatype : '';

	var self = this;

	buildNav(self);

	$scope.$on('mediaTypeChanged', function(event, mediaType) {
		self.mediaType = self.$routeParams.mediatype !== undefined ? self.$routeParams.mediatype : '';
		buildNav(self);
	});
}


function buildNav(self){
	self.topicNavService.get(self.mediaType).then( function({data}){
		self.data = transform( data );
	});
}

	// TEMP
Controller.prototype.click = function ( { id, name }, $event ) {
	$event.preventDefault();

	var url = '/results/page/1/sort/desc/group/0';

	if (this.$routeParams.mediatype) {
		url += '/mediatype/' + this.$routeParams.mediatype;
	}
	url += '/topic/' + id;

	//this.$scope.$apply(this.$location.path(url));
	this.$location.path(url);

	// Metrics
	//updateVariables(s.prop40 = 'TopicClick:' + id);
};

	// TEMP
Controller.prototype.expandClick = function ( item, $event ) {
	$event.preventDefault();

	if ( this.prevCollapsedItem ) {
		// if the item which has been selected is the same as the previous seleted one -> flip
		if ( this.prevCollapsedItem.id === item.id ) {
			item.expanded = !this.prevCollapsedItem.expanded;
		// otherwise set current selected item to expand
		} else {
			item.expanded = true;
			this.prevCollapsedItem.expanded = false;
		}
	} else {
		item.expanded = true;
	}

	// set current item to future previous item
	this.prevCollapsedItem = item;
};

Controller.prototype.homeclick = function ( $event ) {
	$event.preventDefault();
	var url =  '/results';
	//this.$scope.$apply( this.$location.path( url ) );
	this.$location.path( url );
	this.mediaType = '';
	buildNav(this);
};


module.exports = Controller;