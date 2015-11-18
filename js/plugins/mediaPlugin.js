'use strict';

var dataServices = require( '../dataServices' ),
	_PLUGIN_NAME = 'mediaPlugin',
	_defaults = {
		mediaId: '',
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

		var params = {
			format: _options.outputFormat,
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
			_target.addClass(_options.cssClass);

			var content = $('<div>').html(data.content),
				lookForObj = $('object', content),
				lookForIframe = $('iframe', content);

			if (lookForObj.length) {
				lookForObj.removeAttr('width').width('100%').attr('salign', 'TL');
				lookForObj.removeAttr('wmode').attr('wmode', 'transparent');
			}

			if (lookForIframe.length > 0) {
				lookForIframe.removeAttr('width').width('100%');
				lookForIframe.parent().addClass('video-embed-container');

				// fix IE wmode bug for iFrame
				var currentSrc = lookForIframe.attr('src');
				if (currentSrc.indexOf('?') > -1) {
					lookForIframe.attr('src', currentSrc + '&wmode=transparent');
				} else {
					lookForIframe.attr('src', currentSrc + '?wmode=transparent');
				}
				lookForIframe.attr('wmode', 'transparent');
			}

			// open all links in new tab
			_target.empty().append(content).find('a').attr('target', '_blank');

			// fix IE wmode bug
			$("object").append(
				$("<param/>").attr({
					'name': 'wmode',
					'value': 'transparent'
				})
			).find("embed").attr('wmode', 'transparent');

			$.getScript("https://.....[productionToolsServer]...../api/embed/html/js/embed-2.0.2.js", function(){});

			if (_options.postProcess) _options.postProcess();
		});
	}

	main();

	return this;
};
