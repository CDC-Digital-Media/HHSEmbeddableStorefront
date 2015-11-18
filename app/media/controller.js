var SETTINGS = require('../config/SETTINGS');
var CONFIG = require('../../js/CONFIG');

function Controller(mediaService, userService, syndicationListService, $routeParams, $rootScope, temp_app, resultRouteBuilder) {

	this.pending = true;
	this.userService = userService;
	this.syndicationListService = syndicationListService;
	this.$routeParams = $routeParams;
	this.$rootScope = $rootScope;
	this.temp_app = temp_app;
	this.resultRouteBuilder = resultRouteBuilder;
	this.nonSyndMediaTypes = ['PODCAST','PODCAST SERIES','ECARD','COLLECTION'];

	if(!this.$routeParams.embed){this.$routeParams.embed = '0';}
	this.showEmbed = this.$routeParams.embed === '0' ? false : true;
	this.showAddRemove = false;

	var self = this;

	self.selectedMediaIds = [];
	self.userData = userService.getUserData();
	self.embeddable = CONFIG.EMBEDDABLE;

	if (this.$rootScope.syndList) {
		self.selectedMedia = syndicationListService.getSyndicationList(this.$rootScope.syndList.syndicationListId, 1, 10000).then(function({ data, meta }){
			self.selectedMediaIds = data.map(function(itm, idx){return itm.id;});
			self.showAddRemove = true;
		});
	}
	
	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();

	if (this.$routeParams.id) {

		mediaService.getMediaItem(this.$routeParams.id).then( function({data}){
			self.mediaItem = data[0];
			//self.temp_app.displayMediaItem(data[0], self.showEmbed);

			self.pending = false;							

			mediaService.getMediaItemEmbedCode(self.$routeParams.id).then( function({data}){
				self.mediaItem.embedCode = $('<div/>').html(data[0].snippet).text();
				self.temp_app.displayMediaItem(self.mediaItem, self.showEmbed);
			});
		});


	}

	if (self.embeddable === true) {
		self.embeddableTitle = $rootScope.embeddableTitle;
		if (self.embeddableTitle === undefined || self.embeddableTitle === '') {
			self.embeddableTitle = SETTINGS.EMBEDDABLE_DEFAULT_TITLE;
		}
  	//jQuery('h3.embedTitle').html(self.embeddableTitle);
	}		
}

Controller.prototype.goBack = function(){
	window.history.back();
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

module.exports = Controller;