function Controller(temp_app, userService) {

	var self = this;
	this.userService = userService;
	self.user = userService.getUserData().user;

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();
}

module.exports = Controller;