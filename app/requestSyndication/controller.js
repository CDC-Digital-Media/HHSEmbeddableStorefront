var CONFIG = require('../../js/CONFIG');
var MAX_ITEMS = require('../config/SETTINGS').REQUEST_SYNDICATION.MAX_ITEMS;

function Controller(requestSyndicationService, userService, temp_app, $routeParams, $sce) {

	this.userService = userService;
	this.$routeParams = $routeParams;
	this.emailforms = { email: '' };

	var self = this;

	if (userService.getUserData()) {
		self.emailforms.email = userService.getUserData().user.email;
	}

	// initialize array
	if (this.$routeParams.url) {
		self.requestPages = [self.$routeParams.url];
	} else {
		self.requestPages = [''];
	}

	self.validationResults = [''];
	self.MAX_ITEMS = MAX_ITEMS;

	self.EMAIL_VALIDATOR = $sce.trustAsResourceUrl(CONFIG.SERVER.EMAIL_VALIDATOR);
	self.RCPT = "senderEmail9@email";
	self.HTTP_REFERER = document.location.href;
	self.HTTP_USER_AGENT = navigator.userAgent;
	self.HTTP_HOST = window.location.host;
	self.EMAIL_REQUEST_TEMPLATE = CONFIG.SERVER.EMAIL_REQUEST_TEMPLATE;
	self.EMAIL_REQUEST_REFER = CONFIG.SERVER.EMAIL_REQUEST_REFER;

	self.pending = false;


	// need to validate entries.
	//https://.....[productionServer]...../api/v2/resources/media?sourceUrl=http://www......[domain]...../flu
	//urlExists

	//requestSyndicationService.urlExists()

}

Controller.prototype.removeItem = function ( index ) {

	// check if there's more than 1 left (we need to the last one!)
	if ( this.requestPages.length > 1 ) {
		// remove item from array
		this.requestPages.splice(index, 1);
		this.validationResults.splice(index, 1);

	// though remove the value from the input if we are the only item
	} else if ( this.requestPages.length === 1 ) {
		this.requestPages[index] = '';
		this.validationResults[index] = '';
	}
};

Controller.prototype.addItem = function () {
	this.requestPages.push('');
	this.validationResults.push('');
	setTimeout(function () { $('.requestPageURL').last().focus(); }, 100);
};

module.exports = Controller;
