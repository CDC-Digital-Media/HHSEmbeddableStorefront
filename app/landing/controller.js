function Controller( $location, $routeParams, LandingService, resultRouteBuilder ) {
	
	var self = this;

	self.LandingService = LandingService;
	self.$location = $location;
	self.$routeParams = $routeParams;
	self.resultRouteBuilder = resultRouteBuilder;
	self.showSpinner = true;
	self.mediatype = $routeParams.mediatype;

	getMediaTypes(self);
	
	self.mediatype = getNameFromMediaType(self, $routeParams.mediatype);

	if(!self.$routeParams.page){self.$routeParams.page = 1;}
	
	// LANDING PAGE
	if (!$routeParams.id) {
		LandingService.getData(self.$routeParams).then( function({ data, meta }){
			self.landingData = data;
			self.meta = meta;

			getPagingInfo(self, meta.pagination);
			
			self.showSpinner = false;
		});
	} 
	// LANDING DETAIL
	else {
		LandingService.getMediaChildren($routeParams.id).then( function({ data, meta }){
			self.landingDetail = data[0];
			self.showChildItems = self.landingDetail.children.length > 0;
			self.showSpinner = false;
		});
	}

}

Controller.prototype.prev = function () {
	if(this.$routeParams.page>1){this.$routeParams.page-=1;}
	updateRoute(this);
};

Controller.prototype.next = function () {
	if(this.$routeParams.page < this.totalPages){this.$routeParams.page = (this.$routeParams.page*1) + 1;}
	updateRoute(this);
};

Controller.prototype.prevEllipse = function () {
	if(this.$routeParams.page>5){this.$routeParams.page-=5;}
	updateRoute(this);
};

Controller.prototype.nextEllipse = function () {
	if(this.$routeParams.page < this.totalPages-5){this.$routeParams.page = (this.$routeParams.page*1) + 5;}
	updateRoute(this);
};

Controller.prototype.page = function (pageNum) {
	this.$routeParams.page = pageNum;
	updateRoute(this);
};

Controller.prototype.selectCategory = function (id, name, $event) {
	$.cookie('selectedTopic', JSON.stringify(id));
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.showHow = function(){
	$( '#howIUse' ).modal({ show: true, keyboard: true });
};

Controller.prototype.getPartial = function(){
	var filereturn = 'default';

	if (this.$routeParams.mediatype.toLowerCase() === 'feed') {
		filereturn = this.$routeParams.mediatype;
	}

	return 'app/landing/layouts/' + filereturn + '.html';
};

Controller.prototype.getSidebarPartial = function(){
	return 'app/landing/sidebars/' + this.$routeParams.mediatype + '.html';
};

Controller.prototype.routeDetailPage = function (item) {
	if (item.mediaType.toLowerCase() === 'feed') {
		this.$location.path('/landing/mediatype/feed/' + item.id);
	} else {
		this.$location.path('/media/id/' + item.id);
	}
};


function getMediaTypes(self) {

	if ($.cookie('mediaTypes')){
		self.mediaTypes = $.parseJSON($.cookie('mediaTypes'));
	} else {
		// Debug this!!!  Clear cookies, then hit a landing page
		self.landingService.getMediaTypes().then( function({ data, meta }){
			self.mediaTypes = data;
			$.cookie('mediaTypes',JSON.stringify(data));			
		});
	}
}

function getNameFromMediaType(self, type){
	return $.grep(self.mediaTypes, function(mt) {
		return mt.name.toUpperCase() == type.toUpperCase();
	})[0].description;
}

function updateRoute(self) {
	var url = '/landing';

	if (self.$routeParams.mediatype) {
		url += '/mediatype/' + self.$routeParams.mediatype;
	}
	if (self.$routeParams.page) {
		url += '/page/' + self.$routeParams.page;
	}
	if (self.$routeParams.topic) {
		url += '/topic/' + self.$routeParams.topic;
	}
	if (self.$routeParams.query) {
		url += '/query/' + self.$routeParams.query;
	}
	if (self.$routeParams.url) {
		url += '/url/' + self.$routeParams.url;
	}
	self.$location.path(url);
}

function getPagingInfo(self, pageData){
	var i;
	var startPosition, endPostion;

	self.pages = [];
	self.showStartEllipse = false;
	self.showEndEllipse = false;
	self.totalPages = pageData.totalPages;
	self.currentPage = pageData.pageNum;

	if (self.currentPage <= 5) {
		startPosition = 1;
		endPostion = self.totalPages < 5 ? self.totalPages : 5;
		self.showEndEllipse = pageData.totalPages > 7;
	} else if (self.currentPage >= pageData.totalPages - 5) {
		startPosition = pageData.totalPages - 5;
		endPostion = pageData.totalPages;
		self.showStartEllipse = self.currentPage > 3;
	} else {
		startPosition = self.currentPage - 2;
		endPostion = self.currentPage + 2;
		self.showStartEllipse = true;
		self.showEndEllipse = true;
	}

	for (i = startPosition; i <= endPostion; i++) {
		self.pages.push({'pageNumber': i});
	}
	
}

module.exports = Controller;