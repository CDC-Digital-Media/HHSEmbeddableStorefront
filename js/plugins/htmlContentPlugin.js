'use strict';

var dataServices = require( '../dataServices' ),
	_PLUGIN_NAME = 'htmlContentPlugin',
	_defaults = {
		mediaId: '',
		cssClass: 'csHtmlContent',
		stripScripts: true,
		stripAnchorTags: false,
		stripImages: false,
		stripComments: true,
		stripInlineStyles: true,
		imageFloat: 'none',
		postProcess: null,
		outputFormat: 'XHTML',
		nameSpace: '',
		newWindow: false
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {

		if (!_options.mediaId) {
			alert('No Media Id was specified.');
			return;
		}

		var params = {
			stripScripts: _options.stripScripts,
			stripAnchors: _options.stripAnchorTags,
			stripImages: _options.stripImages,
			stripComments: _options.stripComments,
			stripStyles: _options.stripInlineStyles,
			imageFloat: _options.imageFloat,
			ns: _options.nameSpace,
			nw: _options.newWindow
		};

		dataServices.getMediaSyndicate( _options.mediaId, params, function(err, data) {
			_target
				.addClass(_options.cssClass)
				.html(data[0].content);

			if (_options.postProcess) _options.postProcess();
		});
	}

	main();

	return this;
};