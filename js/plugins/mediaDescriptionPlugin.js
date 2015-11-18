'use strict';

var _ = require( 'lodash' ),
	CONFIG = require( '../CONFIG' ),
	SOCIAL_MEDIA_SETTINGS = require( '../SETTINGS' ).SOCIAL_MEDIA,
	utils = require('../utils'),
	_PLUGIN_NAME = 'mediaDescriptionPlugin',
	_defaults = {
		mediaItem: null,
		topicNavHandler: null,
		postProcessHandler: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {
		_target.empty();
		var description = $('<div>');
		_target.prepend(description);
		description.load('templates/mediaDescription.html', setupHeader.bind(undefined, _options.mediaItem));

		window.setTimeout(function () {

			// click event for tags:
			_target.find(".medDefTag").each(function (idx, itm) {
				$(itm).off().click(function (event) {
					event.preventDefault();
					$.removeCookie('selectedMediaTypes');
					$.removeCookie('selectedTopic');
					$.removeCookie('selectedSearch');
					var $tpc = $(this);
					var id = $tpc.attr("data-tag-id");

					$.cookie('selectedTopic', JSON.stringify(id));

					var url = '/results/page/1/sort/desc/group/0';
					url += '/topic/' + id;
					window.location.hash = "#" + url;
				});
			});

		}, 500);

	}

	function setupHeader(mediaItem) {

		var description = mediaItem.description || '<i>No description provided</i>';
		$('.description', _target).html(description);

		var topicList = $('.topicList', _target);
		topicList.children().remove();

		var tags = _.map(mediaItem.tags, function (value) {
			return '<a class="medDefTag" style="cursor: pointer;" data-tag-id="' + value.id + '" data-tag-name="' + value.name + '">' + value.name + '</a>';
		});
		topicList.append( tags.join( ', ' ) );

		var urlElem = $('.url', _target);

		if (mediaItem.sourceUrl && mediaItem.sourceUrl.indexOf('http://') === 0) {
			var a = $('<a href="' + mediaItem.sourceUrl + '" target="_blank">' + mediaItem.sourceUrl + '</a>');
			urlElem.append(a);
		} else {
			urlElem.parent().hide();
		}

		var mediaDimensions = $('.mediaDimensions', _target);

		// DIMENSIONS
		if ( _.contains( [ 'BUTTON', 'BADGE', 'IMAGE', 'INFOGRAPHIC' ], mediaItem.mediaType.toUpperCase() ) && mediaItem.width && mediaItem.height ) {
			var dimensions = mediaItem.width + ' x ' + mediaItem.height;

			mediaDimensions.html(dimensions);
		} else {
			mediaDimensions.parent().hide();
		}

		$('.pubDate', _target).html(utils.misc.formatDate(mediaItem.datePublished));
		$('.lastUpdated', _target).html(utils.misc.formatDate(mediaItem.dateModified));
		$('.attribution', _target).html(mediaItem.attribution);

		var location = _.pluck( mediaItem.geoTags, 'geoNameId' ).join(', ');

		$('.location', _target).html(location);

		var url = require( 'url' ).parse( ( document.location.href ), true ),
			shareUrl = url.protocol + '//' + url.host + CONFIG.SERVER.WEB_ROOT + '/share.aspx?mediaid=' + mediaItem.id;

		if (mediaItem.mediaType.toUpperCase() === "MICROSITE") {
			$('.facebook, .twitter, .google', _target).hide();
		} else {
			$('.facebook, .twitter, .google', _target).on('click', function (e) {
				e.preventDefault();
				share($(this).data('socialmedia').toUpperCase(), shareUrl);
			});
		}

		// attach href (angular takes care of it)
		$( '.usageGuidelines', _target ).attr( 'href', '#/usageguidelines/info' );

		if (_options.postProcessHandler) _options.postProcessHandler();

	}

	function share( socialMedia, url ) {
		var options = SOCIAL_MEDIA_SETTINGS[ socialMedia ];
		window.open( options.URL + encodeURIComponent( url ), options.WINDOW_NAME, options.WINDOW_FEATURE );
	}

	main();

	return this;
};