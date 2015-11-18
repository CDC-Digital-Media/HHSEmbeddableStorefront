'use strict';

var CONFIG = require( '../CONFIG' ),
	embed = require( '../embed' ),
	_PLUGIN_NAME = 'ecardEmbedPlugin',
	_defaults = {
		mediaItem: null,
		toggleEmbedView: false
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {

		embed.setupTabs(_target, showPreview, showEmbedForm, false, _options.toggleEmbedView);

		// ecard does not have embed functionality
		$('.embedTab').hide();
		$('.cs-tile-addtolist').hide();

		showPreview();

		embed.setupReturnLink(_target, _options.returnHandler);
	}

	function showPreview() {
		$('.previewPane').show();
		$('.embedForm').hide();
		$('.previewPane').showSpinnerPlugin();

		$('.previewPane').ecardPlugin({
			mediaId: _options.mediaItem.id,
			filePath: CONFIG.SERVER.WEB_ROOT + '/mediaAssets/ecards/cards/',
			returnNavigation: {
				text: '',
				navigateUrl: 'default.html'
			},
			completeNavigation: {
				text: '',
				navigateUrl: 'default.html'
			},
			receiptUrl: CONFIG.SERVER.ECARD_URL
		});

		embed.buildDescription(_options);
	}

	function showEmbedForm() {
		$('.previewPane, .descriptionContainer').hide();
		$('.embedForm').show();
	}

	main();

	return this;
};