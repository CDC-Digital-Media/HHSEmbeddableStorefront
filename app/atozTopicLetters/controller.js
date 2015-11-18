var TEMPLATE_MAPPING = require( '../config/SETTINGS' ).TEMPLATE_MAPPING;

function Controller ( atozTopicLettersService ) {
	
	this.template = TEMPLATE_MAPPING.ATOZ_TOPIC_LETTERS;

	atozTopicLettersService.get().then( ({ data }) => {
		this.items = data;
	});

}

module.exports = Controller;