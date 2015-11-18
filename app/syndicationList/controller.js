function Controller(syndicationListService, userService, $routeParams, $rootScope, temp_app) {

	var self = this;
	this.syndicationListService = syndicationListService;
	this.userService = userService;
	this.userData = this.userService.getUserData();
	this.syndLists = this.userService.getUserData().syndicationLists;
	this.$routeParams = $routeParams;
	this.$rootScope = $rootScope;
	this.temp_app = temp_app;
	this.showHelp = false;
	
	if(!this.$routeParams.page){this.$routeParams.page = 1;}

	$('.selectedMedia .progressIndicator').show();

	if($rootScope.requestPageMediaId){
		this.syndicationListService.addMediaToSyndicationList( $rootScope.requestPageMediaId, this.$rootScope.syndList.syndicationListId, this.userData.user.email).then( function({ data, meta }){ 
			self.showMediaAdded = true;	
			$rootScope.requestPageMediaId = undefined;
		});
	}

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();

	this.userName = (this.userData.user.firstName + ' ' + (this.userData.user.middleName || '') + ' ' + this.userData.user.lastName);
		
	if(this.$routeParams.id){
		this.$rootScope.syndList = this.userService.getSyndicationListById(this.$routeParams.id);
	}else{
		this.$rootScope.syndList = this.userService.getDefaultSyndicationList();		
	}

	$('.selectedMedia .progressIndicator').show();
	getSyndicationList(self);

}

function getSyndicationList(self){
	if(self.$rootScope.syndList){

		self.syndicationListService.getSyndicationList(self.$rootScope.syndList.syndicationListId, self.$routeParams.page).then( function({ data, meta }){
			self.data = data;
			self.meta = meta;

			self.showHelp = meta.pagination.total === 0;

			getPagingInfo(self, meta.pagination);				
			$('.selectedMedia .progressIndicator').hide();	
		});

	}
}

Controller.prototype.closeHelp = function() {
	this.showHelp = false;
	this.userData.user.newAccount = undefined;
	this.userService.setUserData(this.userData);
};

Controller.prototype.openHelp = function() {
	this.showHelp = true;
};

Controller.prototype.removeMedia = function(mediaId) {
	$('.selectedMedia .deleteSpinner').each(function(){
		$(this).css('width',$(this).parent().width());
		$(this).css('height',$(this).parent().height());
		$(this).css('top',$(this).parent().position().top);
		$(this).css('left',$(this).parent().position().left);
	});

	// lets highlight the deleting row -
	$.grep(this.data, function(itm) {return itm.id === mediaId; })[0].deleting = true;

	// page back if deleting last item on page -
	if(this.$routeParams.page && this.$routeParams.page > 1 && this.data.length === 1){
		this.$routeParams.page-=1;
	}

	var self = this;
	this.syndicationListService.removeMediaFromSyndicationList( mediaId, this.$rootScope.syndList.syndicationListId, this.userData.user.email).then( function({ data, meta }){ 
			getSyndicationList(self);
		});
};

Controller.prototype.formatDate = function(zdate) {
	if (!zdate) return '';
	var date = new Date(zdate);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
};

Controller.prototype.prev = function () {
	if(this.$routeParams.page>1){this.$routeParams.page-=1;}
	updateRoute(this);
};

Controller.prototype.next = function () {
	if(this.$routeParams.page < this.totalPages){this.$routeParams.page = (this.$routeParams.page*1) + 1;}
	updateRoute(this);
};

Controller.prototype.page = function (pageNum) {
	this.$routeParams.page = pageNum;
	updateRoute(this);
};

function updateRoute(self){
	var url =  '/syndicationlist';

	if (self.$routeParams.id) {
		url += '/' + self.$routeParams.id;
	}
	if (self.$routeParams.page) {
		url += '/page/' + self.$routeParams.page;
	}

	window.location.hash = url;
}

function getPagingInfo(self, pageData){

	
	var i;
	var startPosition, endPostion;

	self.pages = [];
	self.showStartEllipse = false;
	self.showEndEllipse = false;
	self.totalPages = pageData.totalPages;
	self.currentPage = pageData.pageNum;

	if (self.currentPage <= 4) {
		startPosition = 1;
		endPostion = self.totalPages < 5 ? self.totalPages : 5;
		self.showEndEllipse = pageData.totalPages > 7;
	} else if (self.currentPage >= pageData.totalPages - 4) {
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