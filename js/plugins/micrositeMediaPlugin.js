'use strict';

var dataServices = require( '../dataServices' ),
	_PLUGIN_NAME = 'micrositeMediaPlugin',
	_defaults = {
		mediaId: '',
		postProcess: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function htmlDecode(value) {
		return $('<div/>').html(value).text();
	}

	function main() {

		if (!_options.mediaId) {
			alert('No Media Id was specified.');
			return;
		}

		dataServices.getMediaItem(_options.mediaId, function (err, data) {

			_target.addClass(_options.cssClass);
			var content = $('<div>').html('<img src="' + data.alternateImages[0].url + '" />');

			_target.empty().append(content);

			if (_options.postProcess) _options.postProcess();
		});
	}

	main();

	return this;
};