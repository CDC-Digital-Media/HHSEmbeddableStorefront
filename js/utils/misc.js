'use strict';

exports.getUTCTime = function() {
	// UTC time example: "2013-09-27T19:52:20.296Z"
	return new Date().toISOString().slice( 11, 23 );
};

exports.formatDate = function(zdate) {
	if (!zdate) return '';

	var date = new Date(zdate);

	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
};

exports.shortenString = function(text, maxLength) {
	if (text.length > maxLength) {
		text = text.substr(0, maxLength - 3) + '...';
	}
	return text;
};

exports.scrollToTop = function () {
	$('body, html').animate({ scrollTop: 0 }, 500);
};


