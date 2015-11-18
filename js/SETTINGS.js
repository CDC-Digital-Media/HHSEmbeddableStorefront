'use strict';

var APP = {
	TITLE: 'Public Health Media Library'
};
module.exports.APP = APP;

var MEDIA_ICONS = {
	ECARD: 'icon-envelope',
	VIDEO: 'icon-film',
	HTML: 'icon-code',
	IMAGE: 'icon-picture',
	BUTTON: 'icon-th-large',
	BADGE: 'icon-trello',
    MICROSITE: 'icon-desktop',
	WIDGET: 'icon-gear',
	INFOGRAPHIC: 'icon-bar-chart',
	PODCAST: 'icon-headphones',
	FEED: 'icon-rss inactive',
	COLLECTION: 'inactive',
	'PODCAST SERIES': 'icon-headphones inactive',
	TRANSCRIPT: 'inactive',
	AUDIO: 'inactive',
	PDF: 'icon-book'
};
module.exports.MEDIA_ICONS = MEDIA_ICONS;

var SOCIAL_MEDIA = {
	FACEBOOK: {
		URL: 'https://www.facebook.com/sharer/sharer.php?u=',
		WINDOW_NAME: 'Facebook',
		WINDOW_FEATURE: 'width=626,height=436'
	},
	TWITTER: {
		URL: 'https://twitter.com/share?text=',
		WINDOW_NAME: 'Twitter',
		WINDOW_FEATURE: 'width=575,height=400'
	},
	GOOGLE: {
		URL: 'https://plus.google.com/share?url=',
		WINDOW_NAME: 'Google+',
		WINDOW_FEATURE: 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
	}
};
module.exports.SOCIAL_MEDIA = SOCIAL_MEDIA;