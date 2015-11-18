var _SETTINGS = require( '../../js/SETTINGS' );
var CONFIG = require('../../js/CONFIG');
var TEMPLATE_MAPPING = require( '../config/SETTINGS' ).TEMPLATE_MAPPING;
var EMBEDDABLE_DEFAULT_TITLE = require( '../config/SETTINGS' ).EMBEDDABLE_DEFAULT_TITLE;

function Controller(resultsService, userService, syndicationListService, $rootScope, $scope, $location, $routeParams, temp_app, resultRouteBuilder) {

	this.tileTemplate = TEMPLATE_MAPPING.RESULTS_TILE;
	var self = this;

	self.resultsService = resultsService;
	self.userService = userService;
	self.syndicationListService = syndicationListService;
	self.$rootScope = $rootScope;
	self.$scope = $scope;
	self.$location = $location;
	self.$routeParams = $routeParams;
	self.resultRouteBuilder = resultRouteBuilder;
	self.selectedMediaTypes = [];
  self.embeddable = CONFIG.EMBEDDABLE;
	self.showSpinner = true;

	getMediaTypes(self);

	// clear this value - if it exists it's been processed as the /url parameter 
	// and we're done with needing a reference that's avaialble to other controllers	
	self.$rootScope.requestPageUrl = undefined;	

	self.isHomePage = !self.$routeParams.page && !self.$routeParams.sort && !self.$routeParams.group && !self.$routeParams.topic && !self.$routeParams.mediatype && !self.$routeParams.url;

	// start dealing with results by multiple result sets (by media type)
	self.isSingleType = true;

	if(self.$routeParams.mediatype && self.$routeParams.mediatype.indexOf(',') > -1){
		
		self.isSingleType = false;
		self.showSpinner = true;

		var mts = self.$routeParams.mediatype.split(',');
		var temp = {}; temp.selectedMediaTypes = [];
		var typeCounter = 0;
		self.showSearchText = (self.$routeParams.query || self.$routeParams.url)  ? true : false;
		
		mts.forEach(function(mt){
			
			self.$routeParams.mediatype = mt;
			updateResultsHeader(self);
			self.showSpinner = true;

			resultsService.getData(self.$routeParams).then( function({ data, meta }){
				temp.selectedMediaTypes.push({
					name : mt,
					data : $(data).slice(0,4),
					meta : meta,
					headerText : getNameFromMediaType(self, mt)
				});	
				typeCounter += 1;
				if(typeCounter==mts.length){
					// all done!
					self.selectedMediaTypes = temp.selectedMediaTypes;
					setTimeout(function(){
						try {$('.linkDiv').ellipsis({ setTitle: 'always' });}
						catch (e) {}			
					},200);

					self.showSpinner = false;
				}

			});
		});
	} else {
	
		if(!self.$routeParams.page){self.$routeParams.page = 1;}
		if(!self.$routeParams.sort){self.$routeParams.sort = 'desc';} //sort=datemodified,sort=-datemodified
		if(!self.$routeParams.group){self.$routeParams.group = '0';} //sort=mediatype
	
		self.checkGrouped = self.$routeParams.group === '0' ? false : true;
		self.nonSyndMediaTypes = ['PODCAST','PODCAST SERIES','ECARD','COLLECTION','FEED', 'FEED - PROXY', 'FEED - IMPORT'];	
		self.headerText_mediaType = 'All Media Content';
		self.showGrouping = self.$routeParams.mediatype ? false : true;
		self.showSearchText = (self.$routeParams.query || self.$routeParams.url)  ? true : false;
		self.selectedMediaIds = [];
		self.userData = userService.getUserData();
		self.currentMediaType = self.$routeParams.mediatype;
		self.showSpinner = true;

		self.requestingPage = (self.userData && self.$routeParams.url) ?  true : false;

		if (this.$rootScope.syndList) {
			self.selectedMedia = syndicationListService.getSyndicationList(this.$rootScope.syndList.syndicationListId, 1, 10000).then(function({ data, meta }){
				self.selectedMediaIds = data.map(function(itm, idx){return itm.id;});
			});
		}

		if(self.isHomePage){
			// TEMP: show angular view
			// temp_app.angular_preProcessForAngularView();
			$('.featuredContent').show();
			$('.searchLocContent').insertAfter('.homeText');
		} else {
			$('.featuredContent').hide();
		}

		
		self.sortText = self.$routeParams.sort=='desc' ? 'Newest First ' : 'Oldest First ';

		var embeddableCollectionId = $rootScope.embeddableCollectionId;
		if (self.embeddable === true && embeddableCollectionId !== undefined) {
			self.$routeParams.sourceid = embeddableCollectionId;
		}

		resultsService.getData(self.$routeParams).then( function({ data, meta }){
			self.data = data;
			self.meta = meta;
			
			getPagingInfo(self, meta.pagination);

			//replace with filter???
			setTimeout(function(){

				try {
					$('.linkDiv').ellipsis({ setTitle: 'always' });
				}
				catch (e) {}
			
			},200);
			self.showSpinner = false;

		});
		
		if(this.$routeParams.mediatype){
			updateResultsHeader(self);			
		}

		if(this.$routeParams.topic){
			resultsService.getTagInfo(this.$routeParams.topic).then( function({ data, meta }){
				self.$scope.topicName = data[0].name;
				updateResultsHeader(self);
			});
		}

		if (self.embeddable === true) {
			self.embeddableTitle = $rootScope.embeddableTitle;
			if (self.embeddableTitle === undefined || self.embeddableTitle === '') {
				self.embeddableTitle = EMBEDDABLE_DEFAULT_TITLE;
			}

			if (resultsService.displayLayout === 'list') {
				self.showGridLink = true;
				self.showListLink = false;
			} else {
				self.showGridLink = false;
				self.showListLink = true;
			}

			self.embeddableControls = $rootScope.embeddableControls;
			if (self.embeddableControls === undefined || self.embeddableControls === '') {
				self.embeddableControls = true;
			}
			if (self.embeddableControls === 'false') {
				self.embeddableControls = false;
			}

		}	

		if(this.$routeParams.query || this.$routeParams.url){
			updateResultsHeader(self);
		}

		if (_.contains(['Podcast', '', 'eCard', 'Feed'], self.$routeParams.mediatype) || !self.$routeParams.mediatype) {
			$('.pdfHelp').hide();
		}
		
	}
}

Controller.prototype.tileClick = function(item){
	if (item.mediaType.toLowerCase() === 'feed') {
		this.$location.path('/landing/mediatype/feed/' + item.id);
	} else {
		this.$location.path('/media/id/' + item.id);
	}
};

Controller.prototype.goBack = function(){
	window.history.back();
};

Controller.prototype.sort = function(order){
	this.$routeParams.page = 1;
	this.$routeParams.sort = order;
	this.$routeParams.group = '0';
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.group = function(){	
	this.$routeParams.page = 1;
	this.$routeParams.sort = 'desc';
	this.$routeParams.group = this.$routeParams.group === '0' ? 1 : 0;
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.prev = function () {
	if(this.$routeParams.page>1){this.$routeParams.page-=1;}
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.next = function () {
	if(this.$routeParams.page < this.totalPages){this.$routeParams.page = (this.$routeParams.page*1) + 1;}
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.prevEllipse = function () {
	if(this.$routeParams.page>5){this.$routeParams.page-=5;}
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.nextEllipse = function () {
	if(this.$routeParams.page < this.totalPages-5){this.$routeParams.page = (this.$routeParams.page*1) + 5;}
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.page = function (pageNum) {
	this.$routeParams.page = pageNum;
	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.getMediaByType = function (mediaType) {
	$.cookie('selectedMediaTypes', JSON.stringify([mediaType]));
	var route = this.resultRouteBuilder.getRoute();
	this.$location.path(route);
};

Controller.prototype.mediaDetail = function (id) {
	//#/media/id/269221
	//this.$scope.$apply( this.$location.path( '/media/id/' + id ) );
	this.$location.path( '/media/id/' + id );
};

Controller.prototype.addToList = function (id) {
	this.selectedMediaIds.push(id);
	this.syndicationListService.addMediaToSyndicationList( id, this.$rootScope.syndList.syndicationListId, this.userData.user.email);
};

Controller.prototype.removeFromList = function (id) {
	for(var i = this.selectedMediaIds.length - 1; i >= 0; i--) {
		if(this.selectedMediaIds[i] === id) {
			this.selectedMediaIds.splice(i, 1);
		}
	}
	this.syndicationListService.removeMediaFromSyndicationList( id, this.$rootScope.syndList.syndicationListId, this.userData.user.email);
};

Controller.prototype.gridView = function () {
		this.resultsService.displayLayout = 'grid';
		this.showGridLink = false;
		this.showListLink = true;	
		$('#gridlayoutlabel').toggle();
		$('#gridlayoutlink').toggle();
		$('#listlayoutlabel').toggle();
		$('#listlayoutlink').toggle();

		$('.embedWrapper [class*=module].span22').each( function() {
			$(this).toggleClass('span4 span22');
			$(this).removeClass('listview');
		});

		$('.embedWrapper [class*=module].span4 figure img').each( function() {
			$(this).addClass('center');
		});
		window.parentIFrame.size(); //for widget resizing
};

Controller.prototype.listView = function () {
		this.resultsService.displayLayout = 'list';
		this.showGridLink = true;
		this.showListLink = false;	
		$('#gridlayoutlabel').toggle();
		$('#gridlayoutlink').toggle();
		$('#listlayoutlabel').toggle();
		$('#listlayoutlink').toggle();

		$('.embedWrapper [class*=module].span4').each( function() {
			$(this).toggleClass('span4 span22');
			$(this).addClass('listview');
		});

		$('.embedWrapper [class*=module].span22 figure img').each( function() {
			$(this).removeClass('center');
		});
		window.parentIFrame.size(); //for widget resizing
};

Controller.prototype.reloadEmbeddable = function () {
  this.$location.path( '/results' );
};

function getMediaTypes(self) {
	if($.cookie('mediaTypes')){
		self.mediaTypes = $.parseJSON($.cookie('mediaTypes'));
	}else{
		self.resultsService.getMediaTypes().then( function({ data, meta }){
			self.mediaTypes = data;
			$.cookie('mediaTypes',JSON.stringify(data));			
		});
	}
}

function updateResultsHeader(self) {
	if(!self.mediaTypes){
		self.resultsService.getMediaTypes().then( function({ data, meta }){
			self.mediaTypes = data;
			updateResultsHeader(self);
		});
	}else{
		var s = getHeaderText(self);
		self.headerText_mediaType = s;
		setPageTitle(s);
	}
}


function getNameFromMediaType(self, type){
	return $.grep(self.mediaTypes, function(mt) {
		return mt.name == type;
	})[0].description;
}

function getHeaderText(self){
	var s = 'All Media Content';
	if (self.$routeParams.mediatype) {
		s = getNameFromMediaType(self, self.$routeParams.mediatype);
	}

	//if (self.$routeParams.topic) {
	//	s += ': ' + self.$scope.topicName;
	//}	

	//if (self.$routeParams.query) {
	//	s += 'Search Results for "' + self.$routeParams.query + '"';
	//}

	//else if (self.$routeParams.url) {
	//	s = 'Search Results for "' + self.$routeParams.url + '"';
	//}
	return s;
}

//function updateRoute(self){
//	var url =  '/results/page/' + self.$routeParams.page + '/sort/' + self.$routeParams.sort + '/group/' + self.$routeParams.group;
//	debugger;
//	if (self.$routeParams.mediatype) {
//		if (self.$routeParams.mediatype === 'feed') {
//			url = url.replace("/results", "/landing");
//			url = url.replace("/sort/desc/group/0", "");		
//			$location.path(url);
//		} else {
//			url += '/mediatype/' + self.$routeParams.mediatype;
//		}
		
//	}
//	if (self.$routeParams.topic) {
//		url += '/topic/' + self.$routeParams.topic;
//	}
//	if (self.$routeParams.query) {
//		url += '/query/' + self.$routeParams.query;
//	} 
//	if (self.$routeParams.url) {
//		url += '/url/' + self.$routeParams.url;
//	}

//	//self.$scope.$apply( self.$location.path( url ) );
//	self.$location.path( url );
//}


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

function setPageTitle(txt) {
	document.title = _SETTINGS.APP.TITLE + ' - ' + txt;
}

module.exports = Controller;