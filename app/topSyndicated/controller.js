var SETTINGS = require( '../config/SETTINGS' );

function Controller ( topSyndicatedService, temp_app ) {

	this.temp_app = temp_app;
	this.template = SETTINGS.TEMPLATE_MAPPING.TOP_SYNDICATED;
	this.showSpinner = true;

	topSyndicatedService.get( SETTINGS.TOP_SYNDICATED.NUMBER_OF_ITEMS ).then( ({ data }) => {
		this.data = data;
		this.showSpinner = false;
	});
}

module.exports = Controller;