'use strict';

var _PLUGIN_NAME = 'pagerPlugin',
	utils = require('../utils'),
	_defaults = {
		pageData: '',
		pagingHandler: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function performPaging(newPageNumber) {
		if (_options.pagingHandler) _options.pagingHandler(newPageNumber);
	}

	function main() {
		_target.empty();
		if (_options.pageData.totalPages > 1) buildOutPaging();
	}

	function buildOutPaging() {

		var pgHolder = [],
			currentPageNumber = _options.pageData.pageNum,
			i, cssClass;

		// build paging element
		pgHolder.push('<ul>');

		cssClass = ( currentPageNumber === 1 ) ? 'disabled' : 'pgPrev';
		pgHolder.push('<li class="' + cssClass + '"><a data-pager="prev" href="#">Prev</a></li>');

		if (_options.pageData.totalPages <= 6) {
			for (i = 1; i <= _options.pageData.totalPages; i++) {
				pgHolder.push('<li><a data-pager="' + i + '" href="#">' + i + '</a></li>');
			}
		} else {

			var showStartEllipse = false,
				showEndEllipse = false,
				startPosition, endPostion;

			if (currentPageNumber <= 4) {
				startPosition = 1;
				endPostion = 5;
				showEndEllipse = _options.pageData.totalPages > 7;
			} else if (currentPageNumber >= _options.pageData.totalPages - 4) {
				startPosition = _options.pageData.totalPages - 5;
				endPostion = _options.pageData.totalPages;
				showStartEllipse = currentPageNumber > 3;
			} else {
				startPosition = currentPageNumber - 2;
				endPostion = currentPageNumber + 2;
				showStartEllipse = true;
				showEndEllipse = true;
			}

			if (showStartEllipse) {
				pgHolder.push('<li><a data-pager="1" href="#">1</a></li>');
				pgHolder.push('<li class="elipsis"><a href="#">...</a></li>');
			}

			for (i = startPosition; i <= endPostion; i++) {
				pgHolder.push('<li><a data-pager="' + i + '" href="#">' + i + '</a></li>');
			}

			if (showEndEllipse) {
				pgHolder.push('<li class="elipsis"><a href="#">...</a></li>');
				pgHolder.push('<li><a data-pager="' + _options.pageData.totalPages + '" href="#">' + _options.pageData.totalPages + '</a></li>');
			}
		}

		cssClass = (currentPageNumber === _options.pageData.totalPages) ? 'disabled' : 'pgNext';
		pgHolder.push('<li class="' + cssClass + '"><a data-pager="next" href="#">Next</a></li>');

		pgHolder.push('</ul>');
		_target.append(pgHolder.join(''));

		var pageElem = $('a[data-pager="' + currentPageNumber + '"]', _target);

		if (pageElem) pageElem.parent().addClass('active');

		_target.off().on('click', 'a[data-pager]', function (event) {
			event.preventDefault();

			var pager = $(this).data('pager');

			if ( pager === 'prev' ) {
				currentPageNumber--;
			} else if ( pager === 'next' ) {
				currentPageNumber++;
			// it's an integer; parse it
			} else {
				currentPageNumber = parseInt( pager, 10 );
			}

			utils.misc.scrollToTop();

			$('a[data-pager]', _target).parent().removeClass();

			// set the class on the selected anchor
			$(this).parent().addClass('active');

			performPaging( currentPageNumber );
		});

		$('.disabled a, .elipsis', _target).off().removeAttr('data-pager');

		$('.elipsis a', _target).on('click', function() {
			$(this).css({ 'margin-right': '0px', 'margin-top': '0px' });
		});
	}

	main();

	return this;
};