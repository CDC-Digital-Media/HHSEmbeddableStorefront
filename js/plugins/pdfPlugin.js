'use strict';

var dataServices = require( '../dataServices' ),
	_PLUGIN_NAME = 'pdfPlugin',
	_defaults = {
		mediaId: null,
		postProcess: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {

		if (!_options.mediaId) {
			alert('No Media Id was specified.');
			return;
		}

		dataServices.getMediaItem(_options.mediaId, function (err, data) {
			var content = $('<object data="' + data.sourceUrl + '" type="application/pdf" width="100%" height="800px;">');
			_target.empty().append(content);
			_options.postProcess();
		});
	}

	main();

	return this;
};