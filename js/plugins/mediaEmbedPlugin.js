'use strict';

var CONFIG = require( '../CONFIG' ),
	embed = require( '../embed' ),
	_PLUGIN_NAME = 'mediaEmbedPlugin',
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

		$('.previewPane').show();
		$('.embedForm').hide();

		if (!_loaded) {
			$('.previewPane').showSpinnerPlugin();

			$('.previewPane').mediaPlugin({
				mediaId: _options.mediaItem.id,
				postProcess: function() {
					_loaded = true;
				}
			});
		}

		embed.buildDescription(_options);
	}

	function showEmbedForm() {

		$('.previewPane, .descriptionContainer').hide();

		if(!_loaded){
			$('.previewPane').mediaPlugin({
				mediaId: _options.mediaItem.id,
				postProcess: function() {
					_loaded = true;
					loadEmbedForm();
				}
			});
		} else {
			loadEmbedForm();
		}
	}

	function loadEmbedForm() {
		$('.embedForm').show();

		// just load form once
		if (!$('.embedForm').html()) $('.embedForm', _target).load('templates/badgeEmbedForm.html', setupEmbedForm);
	}

	function setupEmbedForm() {
		embed.generateRawCodeBlock(_options);
	}

	main();

	return this;
};