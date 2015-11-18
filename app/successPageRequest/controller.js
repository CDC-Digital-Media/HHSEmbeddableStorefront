var SETTINGS = require( '../config/SETTINGS' );

function Controller ( temp_app ) {

	this.temp_app = temp_app;
	this.template = SETTINGS.TEMPLATE_MAPPING.SUBMIT_SUCCESS_REQUEST;

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();
}

module.exports = Controller;