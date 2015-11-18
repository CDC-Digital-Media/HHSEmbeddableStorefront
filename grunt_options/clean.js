'use strict';

module.exports = function( folder ) {

	return {
		cdc: {
			src: [
				// BE AWARE!!! MODIFY WITH CAUTION!! THIS PARAMETER DELETES FILES AND FOLDERS!!
				//'../Storefront_CDC/**'
				folder + '/**/'
			],
			options: {
				force: true
			}
		}
	};
};