'use strict';

var _ = require( 'lodash' ),
	utils = require( '../utils' ),
	dataServices = require( '../dataServices' ),
	_PLUGIN_NAME = 'podcastPlugin',
	_defaults = {
		mediaId: '',
		navigationHandler: null,
		postProcess: null
	};

var ICON_STYLES = {
	VIDEO: '<span class="sprite-16-qt" alt="MP4 file"></span>',
	AUDIO: '<span class="sprite-16-wmv" alt="MP3 file"></span>',
	TRANSCRIPT: '<span class="sprite-16-pdf" alt="Adobe PDF file"></span>'
};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {

		if (!_options.mediaId) {
			alert('No Media Id was specified.');
			return;
		}

		dataServices.getMediaChildrenWithParent(_options.mediaId, function(err, data) {
			_target.empty().append(buildPodcastItem(data));
			if (_options.postProcess) _options.postProcess();
		});
	}

	function buildPodcastItem(itm) {

		if (_options.genThumbnail && itm.mediaType === 'Image') {
			return $('<img src="' + itm.sourceUrl + '">');
		} else if (_options.genThumbnail || itm.mediaType === 'Image') {
			return;
		}

		var $pItem = $('<div class="csPodcastItem">'),
			$thumb = $('<div class="thumbnail" style="background-image:url(' + itm.thumbnailUrl + ')"></div>');

		$pItem.append($thumb);

		var $itmContent = $('<div class="itemContent">'),
			$date = $('<div class="date">' + utils.misc.formatDate(itm.datePublished) + '</div>'),
			$title = $('<div class="title">' + itm.name + '</div>'),
			$description = $('<div class="description">' + itm.description + '</div>');

		$itmContent
			.append($date)
			.append($title)
			.append($description);

		$pItem.append($itmContent);

		if (itm.sourceUrl) {
			var $lbl = $('<span class="websiteLabel">Website:</span>'),
				$website = $('<a href="#" class="website">' + itm.sourceUrl + '</a>');

			$website.on('click', function() {
				showPopUp(itm.sourceUrl);
				return false;
			});

			$itmContent
				.append($lbl)
				.append($website);
		}

		if (itm.children && itm.children.length > 0) {
			var $related = $('<div>');
			getRelatedItems(itm.children, $related);
			$itmContent.append($related);
		}

		//TODO: make work for multiple parentage.
		if (itm.parents.length > 0) {
			var $series = $('<div class="seriesLink">This Podcast is a part of a Series: <a href="#">' + itm.parents[0].name + '</a></div>');

			$itmContent.append($series);

			$series.find('a').on('click', function() {
				if (_options.navigationHandler) _options.navigationHandler(itm.parents[0].id);
			});
		}

		return $pItem;
	}

	function getRelatedItems(items, $target) {

		var $lbl = $('<span class="lblMediaFiles">Media Files</span>');
		$target.append($lbl);

		var $ul = $('<ul class="relatedItems">');

		_.forEach(items, function( value ) {

			var url = value.targetUrl,
				$li = $('<li>'),
				$a = $('<a target="_blank" href="' + url + '">' + value.mediaType + '</a>');

			$a.on('click', function() {
				showPopUp(url, 320, 260);
				return false;
			});

			$li
				.append( $a )
				.append( ICON_STYLES[ value.mediaType.toUpperCase() ] );

			$ul.append($li);
		});

		$target.append($ul);
	}

	function showPopUp(url, width, height) {
		var w = width != null ? width : 800,
			h = height != null ? height : 600,
			newwindow = window.open(url, '', 'height=' + h + ',width=' + w + ',scrollbars=yes, resizable=yes');

		if (newwindow && window.focus) newwindow.focus();

		return false;
	}

	main();

	return this;
};