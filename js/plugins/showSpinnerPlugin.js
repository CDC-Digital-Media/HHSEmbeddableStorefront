'use strict';

var _PLUGIN_NAME = 'showSpinnerPlugin',
	_defaults = {
		allowMultiple: false,
		location: 'append'
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {
		if (_options.allowMultiple || $('.progressIndicator').length === 0) _target.append('<div class="progressIndicator"></div>');
	}

	main();

	return this;
};