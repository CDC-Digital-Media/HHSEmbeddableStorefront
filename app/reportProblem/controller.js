var CONFIG = require( '../../js/CONFIG' );

function Controller(reportProblemService, userService, temp_app, $sce) {

	this.userService = userService;
	this.emailforms = { email: '', problemUrl: '' };

	var self = this;

	if (userService.getUserData()) {
		self.emailforms.email = userService.getUserData().user.email;
	}
	
	self.EMAIL_VALIDATOR = $sce.trustAsResourceUrl(CONFIG.SERVER.EMAIL_VALIDATOR);
	self.RCPT = "senderEmail9@email";
	self.HTTP_REFERER = document.location.href;
	self.HTTP_USER_AGENT = navigator.userAgent;
	self.HTTP_HOST = window.location.host;
	self.EMAIL_REPORT_TEMPLATE = CONFIG.SERVER.EMAIL_REPORT_TEMPLATE;
	self.EMAIL_REPORT_REFER = CONFIG.SERVER.EMAIL_REPORT_REFER;

}

module.exports = Controller;
