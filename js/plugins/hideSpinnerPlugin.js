'use strict';

var _PLUGIN_NAME = 'hideSpinnerPlugin';

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this;

	function main() {
		$('.progressIndicator', _target).remove();
	}

	main();
};