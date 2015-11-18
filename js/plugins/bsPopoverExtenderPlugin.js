'use strict';

var _PLUGIN_NAME = 'bsPopoverExtenderPlugin',
	_defaults = {
		contentSource: '',
		cssClass: '',
		placement: 'top'
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {

		_target.on('click', function(e) {
			//$('[data-original-title]').popover('hide');
			e.stopPropagation();
			return false;
		});

		_target.popover({
			html: true,
			content: _options.contentSource.html(),
			template: '<div class="popover ' + _options.cssClass + '"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
			title: '<span class="text-info"><strong>' + _options.contentSource.attr('title') + '</strong></span>' +
					'<button type="button" id="close" class="close" onclick="$(&quot;' + _target.selector + '&quot;).popover(&quot;hide&quot;);">&times;</button>',
			placement: _options.placement
		});

		$(document).on('click', function (e) {
			_target.popover('hide');
		});
	}

	// Used in embed code form to wire up help content that's stored in HtmlEmbedForm.htm
	//
	// ... in the following sample, displayOptionHelpContent is used as the selector for the content of the BootStrap popover.
	//
	//  <div style='display: none;'>
	//      <div class='displayOptionHelpContent' title='Display Options'>
	//          <small>
	//              <table class='table'>[help content]
	//
	//  cssClass provides a means to add/override the default bootstrap popover styles.
	//
	//  There are some additional bits that shut down any other popover windows and handle event bubbling so tha the page location
	//  will not shift when the target is clicked.

	main();

	return this;
};