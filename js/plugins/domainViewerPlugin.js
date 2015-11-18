'use strict';

var utils = require( '../utils' ),
	_PLUGIN_NAME = 'domainViewerPlugin';

$.fn[_PLUGIN_NAME] = function(options) {

	var _target = this;

	function main() {
		_target.hover(function() {
			if (!$(this).find('a').is('.orgDomain-default')) {
				if ($(this).find('span').length === 0) {
					$(this).append('<span class="set"><a href="#" class="orgDomain-setdefault">Set as default</a></span>');
				}
			}
		}, function() {
			$(this).find('span.set:last').remove();
		});
	}

	main();

	return this;
};