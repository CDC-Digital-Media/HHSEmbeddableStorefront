
(function ($) {

	'use strict';

	var PLUGIN_NAME = 'htmlContentPlugin';

	$[PLUGIN_NAME] = {
		defaults: {
			mediaId: '',
			apiRoot: '',
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
			newWindow: true
		}
	};

	$.fn[PLUGIN_NAME] = function (options) {

		var _target = this,
			_options = $.extend({}, $[PLUGIN_NAME].defaults, options);

		main();

		function main() {

			var url = _options.apiRoot + '/api/v2/resources/media/' + _options.mediaId + '/syndicate.json';

			$.ajax({
				type: 'GET',
				url: url,
				//data: _options,
				contentType: 'application/json; charset=utf-8',
				dataType: 'jsonp'
			})
			.done(function (response) {

				_target
					.addClass(_options.cssClass)
					.html(response.results.content);
			})
			.fail(function (xhr, ajaxOptions, thrownError) {
				//alert(xhr.status);
				//alert(thrownError);
			});
		}
	};

})(jQuery);