'use strict';

var CONFIG = require( '../CONFIG' ),
	embed = require( '../embed' ),
	_PLUGIN_NAME = 'micrositeEmbedPlugin',
	_defaults = {
		mediaItem: null,
		returnHandler: null,
		toggleEmbedView: false
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options),
		_loaded = false;

	function main() {
		_loaded = false;
		embed.setupTabs(_target, showPreview, showEmbedForm, false, _options.toggleEmbedView);

		( _options.toggleEmbedView ? showEmbedForm : showPreview )();

		embed.setupReturnLink(_target, _options.returnHandler);
	}

	function showPreview() {
		var $previewPane = $('.previewPane');

		$('.previewPane').show();
		$('.embedForm').hide();

		if (!_loaded) {
			$previewPane.showSpinnerPlugin();

			$previewPane.micrositeMediaPlugin({
				mediaId: _options.mediaItem.id,
				postProcess: function () {
					_loaded = true;
					$previewPane.append('<div class="micrositePreviewBtn"><a href="' + _options.mediaItem.targetUrl + '" target="_blank" class="btn btn-primary">Preview ' + _options.mediaItem.name + ' Microsite</a></div>');
				}
			});
		}

		embed.buildDescription(_options);
	}

	function showEmbedForm() {

		$('.previewPane, .descriptionContainer').hide();

		$('textarea.codeBlock').val(_options.mediaItem.embedCode.toString());
		loadEmbedForm();
	}

	function loadEmbedForm() {
		$('.embedForm').show();

		// just load form once
		if (!$('.embedForm').html()) $('.embedForm', _target).load('templates/badgeEmbedForm.html', setupEmbedForm);
	}

	function setupEmbedForm() {
		embed.generateRawCodeBlock(_options, false);
	}

	main();

	return this;
};