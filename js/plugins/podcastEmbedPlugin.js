'use strict';

var CONFIG = require( '../CONFIG' ),
	embed = require( '../embed' ),
	_PLUGIN_NAME = 'podcastEmbedPlugin',
	_defaults = {
		mediaItem: null,
		navigationHandler: null,
		returnHandler: null,
		toggleEmbedView: false
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {
		embed.setupTabs(_target, showPreview, showEmbedForm, false, _options.toggleEmbedView);
		// not yet ready to turn on embed ecard
		$('.embedTab').hide();
		$('.cs-tile-addtolist').hide();

		( _options.toggleEmbedView ? showEmbedForm : showPreview )();
		embed.setupReturnLink(_target, _options.returnHandler);
	}

	function showPreview() {

		$('.previewPane').show();
		$('.embedForm').hide();
		$('.previewPane').showSpinnerPlugin();

		$('.previewPane').podcastPlugin({
			mediaId: _options.mediaItem.id,
			navigationHandler: _options.navigationHandler
		});

		embed.buildDescription(_options);
	}

	function showEmbedForm() {

		$('.previewPane, .descriptionContainer').hide();
		$('.embedForm').show();

		// just load form once
		if (!$('.embedForm').html()) $('.embedForm', _target).load('templates/podcastEmbedForm.html', setupEmbedForm);
	}

	function setupEmbedForm() {
		var codeBlock = [],
			urlRoot = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + CONFIG.SERVER.WEB_ROOT;

		codeBlock.push('<!-- Markup for CDC Content (' + _options.mediaItem.Title + ') -->\r');

		codeBlock.push('<link href="' + urlRoot + '/css/csPodcast.css" rel="stylesheet" type="text/css"></link>\r');
		codeBlock.push('<script src="' + urlRoot + '/js/plugins/jquery-1.9.1.min.js"></script>\r');
		codeBlock.push('<script src="' + urlRoot + '/js/plugins/cdc.plugin.podcast.js"></script>\r');

		codeBlock.push('\r');
		codeBlock.push('<div class="CDCPodcastContent_' + _options.mediaItem.id.toString() + '"></div>\r');
		codeBlock.push('<script>\r');
		codeBlock.push('$(".CDCPodcastContent_' + _options.mediaItem.id.toString() + '").podcastPlugin({\r');
		codeBlock.push('	mediaId: ' + _options.mediaItem.id + ',\r');
		// codeBlock.push('	apiRoot: "' + CONFIG.SERVER.API_ROOT + '"\r');  // #DN needs fix
		codeBlock.push('})   \r');
		codeBlock.push('</script>\r');
		codeBlock.push('<noscript>You need javascript enabled to view this content or go to the <a href="' + CONFIG.SERVER.API_ROOT + CONFIG.SERVER.ROOT_URL + '/media/' + _options.mediaItem.id.toString() + '/noscript">source URL</a>.</noscript>\r');

		$('.embedForm')
			.find('.jsEmbedBlock textarea')
			.text(codeBlock.join(''))
			.on('click', function() {
				this.focus();
				this.select();
			});
	}

	main();

	return this;
};