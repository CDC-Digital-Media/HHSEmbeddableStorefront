'use strict';

var _ = require('lodash'),
	dataServices = require('../dataServices'),
	utils = require('../utils'),
	syndicationList = require('../syndicationList'),
	_PLUGIN_NAME = 'accountPlugin',
	_defaults = {
		showNewMsg: false,
		id: null,
		previewHandler: null,
		embedHandler: null,
		appState: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options),
		// create some module wide references:
		_userInfo = _options.appState.ctx.userInfo;

	var toggleDefaultView = this.toggleDefaultView = function() {

		var ul = $('ul.ui-tabs-nav', _target);
		$('li', ul).show().removeClass('ui-tabs-active ui-state-active');
		$('.myAccount, .myOrganizations', ul).hide();
		$('.myContent', ul).addClass('ui-tabs-active ui-state-active');

		$('.contentDetail .selectedMedia', _target).empty().showSpinnerPlugin();

		showMyContent();
	};

	var toggleMyAccountView = this.toggleMyAccountView = function() {
		var ul = $('ul.ui-tabs-nav', _target);
		$('li', ul).show().removeClass('ui-tabs-active ui-state-active');
		$('.myContent', ul).hide();
		$('.myAccount', ul).addClass('ui-tabs-active ui-state-active');

		showMyAccount();
	};

	function setupPaging(pageData) {
		$('.account .pagination').pagerPlugin({
			pageData: pageData,
			pagingHandler: performPaging
		});
	}

	function performPaging(pageNum) {
		getSelectedMedia(_options.id, pageNum);
	}

	function showMyAccount() {
		$('.contentDetail, .orgDetail, .contactDetail', _target).hide();
		var contactDetail = $('.contactDetail', _target);
		contactDetail.show().trigger('click');

		$('.firstName span.txt', contactDetail).text(_userInfo.user.firstName);
		$('.middleInit span.txt', contactDetail).text(_userInfo.user.middleName || '');
		$('.lastName span.txt', contactDetail).text(_userInfo.user.lastName);
		$('.emailAddress span.txt', contactDetail).text(_userInfo.user.email);

		$('.editFirstName').on('click', function (event) {
			event.preventDefault();

			var $this = $(this),
				$currentTxt = $this.parent('.firstName').find('span.txt'),
				currentVal = $currentTxt.text();

			$currentTxt.html('<input type="text" class="input-small" value="' + currentVal + '" /> <span class="text-right typeG"><a class="btn btn-primary saveBtn">Save</a></span>');
			$currentTxt.find('input').focus();
			$this.parent('.firstName').find('.editFirstName').hide();

			$('.saveBtn').on('click', function (event) {
				event.preventDefault();

				var $this = $(this),
					currentVal = $this.parents('.txt').find('input').val();

				$this.parents('.txt').html(currentVal);
				$('.editFirstName').show();
			});

		});

		$('.editPass, .savePassBtn').on('click', function (event) {
			event.preventDefault();
			$('.emailPass, .editPassFields').toggle();
		});

		$('.account').hideSpinnerPlugin();
	}

	function setupOrgGrid() {
		$('.icon-user', _target).on('click', function () {
			$('.orgTable', _target).hide();
		});
	}

	function main() {
		_target.empty();
		var account = $('<div>');

		account.load('templates/account.html', function () {
			setupTabs();
			toggleDefaultView();

			if (!_options.showNewMsg) $('.alert-success').hide();
		});

		_target.append(account);
	}

	function setupTabs() {

		var ul = $('ul.ui-tabs-nav', _target);

		$('.myContent', ul).on('click', function () {
			$('li', ul).removeClass('ui-tabs-active ui-state-active');
			$(this).addClass('ui-tabs-active ui-state-active');
			showMyContent();
		});

		$('.myOrganizations', ul).on('click', function () {
			$('li', ul).removeClass('ui-tabs-active ui-state-active');
			$(this).addClass('ui-tabs-active ui-state-active');
			showMyOrganizations();
		});

		$('.myAccount', ul).on('click', function () {
			$('li', ul).removeClass('ui-tabs-active ui-state-active');
			$(this).addClass('ui-tabs-active ui-state-active');
			showMyAccount();
		});

		// set default view upon login
		$('.myAccount, .myOrganizations', ul).hide();

		$('.btnNeedHelp').on('click', function () {
			$('.account .alert-success').fadeIn();
		});

		$('.close').on('click', function () {
			var $this = $(this);

			$this.parents('.alert').fadeOut();
		});

		$('.orgDomains li').domainViewerPlugin();

		$('.orgUsers li').hover(
			function () {
				$(this).append('<span><a href="#" class="orgUsers-setowner">Set as owner</a> &nbsp;|&nbsp; <a href="#" class="orgUsers-remove">Remove from Org</a></span>');
			},
			function () {
				$(this).find('span:last').remove();
			}
		);
	}

	function showMyContent() {

		$('.userName', _target).text(_userInfo.user.firstName + ' ' + ( _userInfo.user.middleName || '' ) + ' ' + _userInfo.user.lastName);
		$('.contentDetail, .orgDetail, .contactDetail', _target).hide();
		$('.contentDetail', _target).show().trigger('click');

		if (_userInfo.syndicationLists.length) {
			getSelectedMedia(_options.id);
		} else {
            $('.account .noContent').show();
            $('.account').hideSpinnerPlugin();
		}
	}

	function showMyOrganizations() {
		$('.contentDetail, .orgDetail, .contactDetail', _target).hide();
		$('.orgDetail', _target).show().trigger('click');
		if (!$('.orgDetail', _target).data('loaded')) loadMyOrganizations();

		$('.orgTable').show();
		$('.orgNew').hide();

		setupOrgGrid();

		$('.btnAddOrg').on('click', function () {
			$('.orgTable').hide();
			$('.orgNew').show().organizationPlugin({
				cancelHandler: showMyOrganizations
			});
		});
	}

	function loadMyOrganizations() {

		var org = _.first( _userInfo.user.organizations ),
			head = $('<h3>');

		head.append( '<span class="orgName">' + org.name +  '</span>' );

		$('.accordion', _target).append(head);

		$('.orgDetail', _target).data('loaded', true);
	}

	function getSelectedMedia( id, pageNum ) {

		dataServices.getAccountMedia( { syndicationlistid: id, pagenum: pageNum }, function ( err, data, meta ) {

			var selectedMedia = $('.selectedMedia', _target);
			selectedMedia.empty();

			$('.account .domainName').text(_options.appState.ctx.selectedList.name);

			if (data.length === 0) {
				$('.account .noContent').show();
				$('.account').hideSpinnerPlugin();
				utils.misc.scrollToTop();
			} else {
				$('.account .noContent').hide();

				var pagination = $('<div class="pagination text-right clearfix"></div>'),
					resultsDiv = $('<div style="clear:both;"></div>');

				selectedMedia
					.append(pagination)
					.append(resultsDiv);

				_.forEach(data, function (value) {
					resultsDiv.mediaListItemPlugin({
						mediaItem: value,
						deleteHandler: getSelectedMedia.bind(undefined, _options.id),
						previewHandler: _options.previewHandler,
						embedHandler: _options.embedHandler,
						appState: _options.appState,
						removeFromList: syndicationList.remove
					});
				});

				setupPaging(meta.pagination);
				$().hideSpinnerPlugin();
				utils.misc.scrollToTop();
			}
		});
	}

	main();

	return this;
};