function Controller($routeParams, ecardService, temp_app) {

	this.temp_app = temp_app;
	this.ecardService = ecardService;
	this.routeParams = $routeParams;
	temp_app.angular_preProcessForAngularView();


	loadData(this);
}

Controller.prototype.refresh = function () {
	loadData(this);
};

function loadData(self) {

	self.ecardService.get(self.routeParams.receiptId).then(function (value) {
		self.mediaItem = value.data.mediaItem;
		self.personalMessage = value.data.personalMessage;

		if (!self.mediaItem.extension.html5Source) {
			var Myflash = new CDC.Video('', 'flashContent', 'MyEcardsButton', true, 580, 400, self.mediaItem.sourceUrl, 580, 400, self.mediaItem.sourceUrl, false);
			Myflash.render();
		}
	});

}


module.exports = Controller;