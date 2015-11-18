'use strict';

module.exports = {
	prod: {
		options: {
			removeComments: true,
			collapseWhitespace: true,
			conservativeCollapse: true   // ---> requires: collapseWhitespace
			//lint: true
			//collapseWhitespace: true
		},
		files: {
			'index.html': 'index.html',
// TODO: template folder!!!
			// template folder:
			//'templates/mediaListItem.html' : 'templates/mediaListItem.html'
		}
	}
};