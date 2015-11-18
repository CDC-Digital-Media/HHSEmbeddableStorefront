'use strict';

var _ = require( 'lodash' ),
	_PLUGIN_NAME = 'domainPickerPlugin',
	_defaults = {
		selectHandler: null,
		postProcess: null,
		appState: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options),
		syndicationLists = _options.appState.ctx.userInfo.syndicationLists;

	function populateSyndicationListDropdown() {
		var list = [];

		$('ul.syndicationlist', _target).empty();

		// Generate dropdown list items into array
		_.forEach(syndicationLists, function ( value ) {
			list.push('<li><a href="#" data-listname="' + value.listName + '" data-listid="' + value.syndicationListId + '"><span class="domainName">' + value.listName + '</span></a></li>');
		});

		// push array to UL
		$('ul', _target).append(list.join(''));

		// Click even for Syndication List
		$('ul.syndicationlist li a', _target).on('click', function() {
			var $this = $(this);

			$this.closest('li').hide();
			$('span.domainName', _target).not(this).closest('li').show();
			_options.appState.setSelectedList($this.attr('data-listname'), $this.attr('data-listid'), _options.selectHandler);
		});
	}

	function main() {
		// clean up any prior lists
		_target.empty();

		if (!_options.appState.ctx.selectedList.name && syndicationLists && syndicationLists.length) {
			var list = syndicationLists[0];
			_options.appState.setSelectedList(list.listName, list.syndicationListId, '');
			$('span.userDomain', _target).text(_options.appState.ctx.selectedList.name);
		}

		if (syndicationLists){
			if (syndicationLists.length > 1) {
				_target.empty();

				_target.append('<span class="userName dropdown-toggle" data-toggle="dropdown">Syndication List <span class="icon-angle-down" style="margin-right:0;"></span></span>');
				_target.append('<ul class="dropdown-menu syndicationlist pull-right">');

				populateSyndicationListDropdown();
			} else {
				_target.append('<span class="userName">Syndication List</span>');
			}
		}
	}

	main();

	return this;
};