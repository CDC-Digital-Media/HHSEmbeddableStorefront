'use strict';

var _ = require( 'lodash' ),
	CONFIG = require( '../CONFIG' ),
	utils = require( '../utils' ),
	dataServices = require( '../dataServices' ),
	embed = require( '../embed' ),
	_PLUGIN_NAME = 'podcastChannelPlugin',
	_defaults = {
		mediaId: '',
		syndicateHandler: null,
		genThumbnail: false,
		returnHandler: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function buildList($ul, imgUrl, txt, extension, type) {
		var $li = $('<li><img src="' + imgUrl + '"><a href="#">' + txt + '</a></li>'),
			url = CONFIG.SERVER.API_ROOT + '/api/v2/resources/media/' + _options.mediaId + '.' + extension + '?showchildlevel=2&feedtype=' + type;

		$ul.append($li);

		$li.on('click', function() {
			showPopUp(url, 800, 600);
			return false;
		});
	}

	function showPopUp(url, width, height) {
		var w = width != null ? width : 800,
			h = height != null ? height : 600,
			newwindow = window.open(url, '', 'height=' + h + ',width=' + w + ',scrollbars=yes, resizable=yes');
		if (newwindow && window.focus) newwindow.focus();
	}

	function showPreview() {
		$('.preview').show();
		$('.subscribe').hide();
	}

	function showSubscribe() {
		$('.preview').hide();
		$('.subscribe').show();
	}

	function main() {

		if (!_options.genThumbnail) {
			setupTabs();

			// not yet ready to turn on embed ecard.
			$('.embedTab').hide();

			embed.setupReturnLink(_target, _options.returnHandler);
			_target.showSpinnerPlugin();
		}

		dataServices.getMediaChildrenLevel2(_options.mediaId, function(err, data) {

			if (err) $().hideSpinnerPlugin();

			var $o = $('.preview').length > 0 ? $('.preview') : _target;

			_.forEach( data.children, function( value ) {
				$o.append(buildPodcastItem(value));
			});

			$('.podcastProgressIndicator', _target).remove();
			//getRelatedItems(itmIds);

			setupSubscription();
			_target.hideSpinnerPlugin();
			setupReturnLink();
		});
	}

	function buildPodcastItem(itm) {

		if (_options.genThumbnail) {
			if (itm.mediaType === 'Image') {
				return $('<img src="' + itm.sourceUrl + '">');
			}
			return;
		} else {
			if (itm.mediaType === 'Image') return;
		}

		var thumbUrl = CONFIG.SERVER.API_ROOT + '/api/v2/resources/media/' + itm.id + '/thumbnail?',
			$pItem = $('<div class="csPodcastItem">'),
			$thumb = $('<div class="thumbnail" style="background-image:url(' + thumbUrl + ')"></div>');

		$pItem.append($thumb);

		var $itmContent = $('<div class="itemContent">'),
			$date = $('<div class="date">Published: ' + utils.misc.formatDate(itm.datePublished) + '</div>'),
			$title = $('<div class="title">' + itm.name + '</div>'),
			$description = $('<div class="description">' + itm.description + '</div>');

		$itmContent
			.append($date)
			.append($title)
			.append($description);

		$pItem.append($itmContent);

		if (itm.sourceUrl) {
			var $lbl = $('<span class="websiteLabel">Website:</span>');
			$itmContent.append($lbl);
			var $website = $('<a href="#" class="website">' + itm.sourceUrl + '</a>');
			$website.on('click', function() {
				showPopUp(itm.sourceUrl);
				return false;
			});
			$itmContent.append($website);
		}

		$itmContent.append('<span class="lblMediaFiles">Media Files</span>');

		var $ul = $('<ul class="relatedItems">');
		$(itm.children).each(function() {
			var url = this.targetUrl,
				$li = $('<li>'),
				$a = $('<a target="_blank" href="' + url + '">' + this.mediaType + '</a>');
			$a.on('click', function() {
				showPopUp(url, 320, 260);
				return false;
			});
			$li.append($a);

			var $iconStyle;

			switch (this.mediaType) {
				case 'Video':
					$iconStyle = $('<span class="sprite-16-qt" alt="MP4 file"></span>');
					break;
				case 'Audio':
					$iconStyle = $('<span class="sprite-16-wmv" alt="MP3 file"></span>');
					break;
				case 'Transcript':
					$iconStyle = $('<span class="sprite-16-pdf" alt="Adobe PDF file"></span>');
					break;
			}

			$li.append($iconStyle);

			$ul.append($li);
		});
		$itmContent.append($ul);

		var $syndicateLabel = $('<div class="syndicateLabel">Do you want to <a href="#">Syndicate this Podcast?</a></div>');
		$pItem.append($syndicateLabel);

		var $syndLink = $syndicateLabel.find('a');
		$syndLink.on('click', function() {
			$('.csMediaHeader, .csMediaContainer').remove();
			if (_options.syndicateHandler) _options.syndicateHandler(itm.id);
		});
		$syndLink.hover(function() {
			$pItem.addClass('selected');
		}, function() {
			$pItem.removeClass('selected');
		});

		return $pItem;
	}

	function setupReturnLink() {
		if (_options.returnHandler) {
			var $div = $('<div class="csMediaFooter">'),
				$returnLink = $('<a class="btn btn-small pull-right btnReturn" style="color:black;" href="#">Return to Results</a>');
			$returnLink.on('click', function () {
				if (_options.returnHandler) _options.returnHandler();
			});
			$div.append($returnLink);
			_target.append($div);
		}
	}

	function setupTabs() {
		var $tabDiv = $('<div class="tabs ui-tabs ui-widget ui-widget-content ui-corner-all" id="TabSet-1" style="visibility: visible;">'),
			$ul = $('<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">');

		$ul.append('<li tabindex="0" class="ui-state-default ui-corner-top ui-tabs-active ui-state-active previewTab" role="tab" aria-selected="true" aria-controls="tabs-1" aria-labelledby="ui-id-1"><a tabindex="-1" class="ui-tabs-anchor" id="ui-id-1" role="presentation" href="#tabs-1">Series Preview</a></li>');
		$ul.append('<li tabindex="-1" class="ui-state-default ui-corner-top subscribeTab" role="tab" aria-selected="false" aria-controls="tabs-2" aria-labelledby="ui-id-2"><a tabindex="-1" class="ui-tabs-anchor" id="ui-id-2" role="presentation" href="#tabs-2">Subscribe to this Series</a></li>');

		var $tabContent = $('<div class="ui-tabs-panel ui-widget-content ui-corner-bottom" id="tabs-1" role="tabpanel" aria-expanded="true" aria-hidden="false" aria-labelledby="ui-id-1">');

		$ul.find('.previewTab').on('click', function (e) {
			$ul.find('li').removeClass('ui-tabs-active ui-state-active');
			$ul.find('.previewTab').addClass('ui-tabs-active ui-state-active');

			showPreview();

			e.preventDefault();
			return false;
		});

		$ul.find('.subscribeTab').on('click', function (e) {
			$ul.find('li').removeClass('ui-tabs-active ui-state-active');
			$ul.find('.subscribeTab').addClass('ui-tabs-active ui-state-active');

			showSubscribe();

			e.preventDefault();
			return false;
		});

		$tabDiv
			.append($ul)
			.append($tabContent);

		_target.append($tabDiv);

		$tabContent = $('.ui-tabs-panel', _target);
		_target.append($tabContent);

		var $divSubscribe = $('<div class="subscribe">');
		$tabContent.append($divSubscribe);

		var $divPreview = $('<div class="preview">');
		$tabContent.append($divPreview);

		showPreview();
	}

	function setupSubscription() {
		var $sub = $('.subscribe');
		$sub.load('templates/PodcastSubscribe.html', function() {

			var $li, $ul,
				$rootUl = $sub.find('.formats');

			//MP4 file
			if ($('.sprite-16-qt').length > 0) {

				$rootUl.append($('<li><b>Video</b></li>'));
				$li = $('<li>');
				$ul = $('<ul>');
				$li.append($ul);

				buildList($ul, 'Images/itunes.png', 'iTunes Video', 'itunes', 'video');
				buildList($ul, 'Images/rss.png', 'RSS Video', 'rss', 'video');

				$rootUl.append($ul);
			}

			//MP3 (audio) file
			if ($('.sprite-16-wmv').length > 0) {

				$rootUl.append($('<li><b>Audio</b></li>'));
				$li = $('<li>');
				$ul = $('<ul>');
				$li.append($ul);

				buildList($ul, 'Images/itunes.png', 'iTunes Audio', 'itunes', 'audio');
				buildList($ul, 'Images/rss.png', 'RSS Audio', 'rss', 'audio');

				$rootUl.append($ul);
			}

			if ($('.sprite-16-pdf').length > 0) {

				$rootUl.append($('<li><b>Transcripts</b></li>'));
				$li = $('<li>');
				$ul = $('<ul>');
				$li.append($ul);

				buildList($ul, 'Images/rss.png', 'RSS Transcript', 'rss', 'transcript');

				$rootUl.append($ul);
			}

			$('.podcastHelp').bsPopoverExtenderPlugin({
				contentSource: $('.podcastHelpContent'),
				cssClass: 'help-podcast',
				placement: 'bottom'
			});

			$('.rssHelp').bsPopoverExtenderPlugin({
				contentSource: $('.rssHelpContent'),
				cssClass: 'help-rss',
				placement: 'bottom'
			});
		});
	}

	main();

	return this;
};