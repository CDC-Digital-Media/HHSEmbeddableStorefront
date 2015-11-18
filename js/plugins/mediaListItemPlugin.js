'use strict';

var CONFIG = require( '../CONFIG' ),
	utils = require( '../utils' ),
	SETTINGS = require( '../SETTINGS' ),
	_PLUGIN_NAME = 'mediaListItemPlugin',
	_defaults = {
		mediaItem: '',
		deleteHandler: null,
		previewHandler: null,
		embedHandler: null,
		appState: null,
		removeFromList: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {
		var obj = _options.mediaItem,
			mediaIcon = '';

		obj.id = obj.id || obj.mediaId;

		utils.ajax.loadTemplate( 'templates/mediaListItem.html', function( err, template ) {

			var item = $('<div>').html( template );

			mediaIcon = '<span class="' + SETTINGS.MEDIA_ICONS[ obj.mediaType.toUpperCase() ] + '" title="' + obj.mediaType + '"></span> &nbsp;';

			// apply content to the template
			var mediaListItem = $('.mediaListItem', item);

			$('.title', mediaListItem).html(obj.name).prepend(mediaIcon);

			$('.mediaListThumb', mediaListItem)
				.html('<img src="' + CONFIG.SERVER.API_ROOT + '/api/v2/resources/media/' + obj.id + '/thumbnail" alt="' + obj.name + '" />')
				.on('click', function() {
					window.location.hash = '/media/id/' + obj.id;
				});

			$('.description', mediaListItem).html(obj.description);
			$('.lastupdated', mediaListItem).append(utils.misc.formatDate(obj.dateModified));

			// don't show get code button for items that we cannot yet embed.
			switch (obj.mediaType.toUpperCase()) {
				case 'PODCAST':
				case 'PODCAST SERIES':
				case 'ECARD':
				case 'COLLECTION':
					$('.mediaList-getcode a', item).hide();
					break;
				default:
					$('.mediaList-getcode a', item).attr('href', '#/media/id/' + obj.id + '/embed/1');
					//$('.mediaList-getcode a', item).off().on('click', function () {
					//	if (_options.embedHandler) _options.embedHandler(obj.id, true);
					//});
					break;
			}

			$('.btn-delete', item).parents('.mediaList-action').on('click', function () {
				$('.contentDetail .selectedMedia').empty().showSpinnerPlugin();
				_options.removeFromList( this, _options.appState.ctx.selectedList.id, obj.id, _options.deleteHandler);
			});

			_target.append(item);
		});
	}

	main();

	return this;
};