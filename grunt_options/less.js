'use strict';

module.exports = {
	dev: {
		src: [
			'css/listNav.less',
			'css/csCard.less',
			'css/csPodcast.less',
			'css/local.less',
			'css/responsive.less'
		],
		dest: 'css/_bundle.css'
	},
	prod: {
		options: {
			compress: true,
			yuicompress: true,
			optimization: 2
		},
		src: [
			'css/listNav.less',
			'css/csCard.less',
			'css/csPodcast.less',
			'css/local.less',
			'css/responsive.less'
		],
		dest: 'css/_bundle.css'
	}
};