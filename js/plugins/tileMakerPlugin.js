'use strict';

var _ = require('lodash'),
	CONFIG = require('../CONFIG'),
	utils = require('../utils'),
	app = require('../app'),
	dataServices = require('../dataServices'),
	syndicationList = require('../syndicationList'),
	_PLUGIN_NAME = 'tileMakerPlugin',
	_defaults = {
		dataUrl: '',
		headerText: 'Header',
		mediaItemHandler: null,
		mediaTypeHandler: null,
		postProcess: null,
		pagingHandler: null,
		appState: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function helpPopover() {
		var selectedMediaType = _options.appState.ctx.mediaType;

		if (_.contains(['Podcast', 'PDF', '', 'eCard'], selectedMediaType)) {
			$('.pdfHelp').hide();
			return;
		}

		//$('.pdfHelp').popover({
		//	content: '<a href="" onclick="window.open(\'./docs/Syndicate' + selectedMediaType + '.pdf\');" class="nonHtml plugin" target="_blank" tabindex="0"><span class="tp-label">' + selectedMediaType + ' Syndication</span></a>',
		//	position: 'right',
		//	trigger: 'click',
		//	animation: true,
		//	title: 'Quick Reference Sheet &nbsp; <a class="pull-right close" onclick="$(\'.popover\').popover(\'hide\');">&times</a>',
		//	html: true
		//});
	}

	function main() {
		var resultSet;

		if ($('.resultSet', _target).length === 0) {
			//new load of widget, prior to paging call - build out necessary structure to house header test and paging
			var $headerRow = $('<div class="row">'),
				$headerText = $('<div class="headerText pull-left"></div>');

			$headerText.html(_options.headerText);

			var $pagination = $('<div class="pagination pull-right"></div>');
			$headerRow
				.append($pagination)
				.append($headerText);

			resultSet = $('<div class="resultSet clearfix"></div>');

			_target
				.append($headerRow)
				.append(resultSet)
				.append($pagination.clone());
		} else {
			//assign container for tiles
			$('.headerText').html(_options.headerText);
			resultSet = $('.resultSet', _target);
			resultSet.empty();
		}

		resultSet.showSpinnerPlugin();

		dataServices.getMedia(_options.dataParams, function (err, data, meta) {

			resultSet.empty();

			_.forEach(data, function (value) {

				var id = value.id,
					name = value.name,
					mediaType = value.mediaType,
                    thumbnailSrc = value.thumbnailUrl,
					tile = $('<div class="module-typeF span4 cs-tile">'),
					$figure = $('<figure class="pull-left">'),
					$titleDiv = $('<div class="linkDiv"><a data-media-id="' + id + '" title="' + name + '" href="#" target="_blank">' + name + '</a></div>'),
					$titleRule = $('<div class="title"></div>'),
					image;

				var alternateImage = _.find(value.alternateImages, function (value) {
					return value.type.toUpperCase() === 'STOREFRONTTHUMBNAIL';
				});

				if (alternateImage) {
					image = $('<img data-media-id="' + id + '" class="stroke center cs-tile-thumb" alt="' + name + '" src="' + alternateImage.url + '" />');
				} else {
					image = $('<img data-media-id="' + id + '" class="stroke center cs-tile-thumb" alt="' + name + '" src="' + thumbnailSrc + '">');
				}

				$figure.append(image);

				tile
					.append($figure)
					.append($titleDiv)
					.append($titleRule);

				// if user is logged in:
				if (_options.appState.ctx.userInfo) {

					var syndList = $('<div data-syndication-id="' + id + '" class="pull-right cs-tile-addtolist"><span class="tiletxt">Add to List</span><i class="icon-plus"></i></div>');
					tile.append(syndList);

					// don't show add to list for items that we cannot yet embed.
					switch (mediaType.toUpperCase()) {
						case 'PODCAST':
						case 'PODCAST SERIES':
						case 'ECARD':
						case 'COLLECTION':
							tile.find(".cs-tile-addtolist").hide();
							break;
						default:
							syndicationList.setupSelectionOptions(id, syndList,
								function () {
									tile.addClass('cs-tile-selected');
									tile.find('.tiletxt').html('Remove');
									tile.find('.cs-tile-addtolist i').removeClass('icon-plus').addClass('icon-remove');
								}, function () {
									tile.removeClass('cs-tile-selected');
									tile.find('.tiletxt').html('Add to List');
									tile.find('.cs-tile-addtolist i').removeClass('icon-remove').addClass('icon-plus');
								}
							);
							break;
					}

				} else {
					// displays only if they're logged out
					var $loggedoutHelp = $('<a href="#" class="pull-right cs-tile-help" title="Please login or create a new user account to add this item to your syndication list"><i class="icon-info-sign"></i></a>');
					tile.append($loggedoutHelp);
				}

				var mediaTypeLink = $('<div class="center cs-tile-foot"><a href="#" data-mediatype="' + mediaType + '" title="' + mediaType + '" class="mediaicon-' + mediaType.toLowerCase().replace(/ /g, '_') + '"><span>' + mediaType + '</span></a></div>');
				tile.append(mediaTypeLink);

				resultSet.append(tile);

				tile.find('.linkDiv').ellipsis({ setTitle: 'always' });
			});

			_target.off().on('click', function (event) {
				var target = $(event.target),
					mediaType = target.data('mediatype'),
					mediaId = target.data('media-id');

				if (mediaType) {
					_options.mediaTypeHandler(mediaType, false);
				}

				if (mediaId) {
					_options.mediaItemHandler(mediaId, false);
				}

				event.preventDefault();
			});

			if (data.length === 0) resultSet.append($('<p style="margin-bottom:100px;"><i>No results were found for your search criteria.<i></p>'));

			resultSet.hideSpinnerPlugin();

			$('.results .pagination').pagerPlugin({
				pageData: meta.pagination,
				pagingHandler: _options.pagingHandler
			});

			if (_options.postProcess) _options.postProcess();

			// Insert item count into title
			$('h1 small:first-child').html(' (' + meta.pagination.total + ')');
		});

		helpPopover();
	}

	main();

	return this;
};