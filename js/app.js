'use strict';

require('./plugins');

var utils = require('./utils'),
	_SETTINGS = require('./SETTINGS'),
	dataServices = require('./dataServices'),
	appState = require('./appState'),
	syndicationList = require('./syndicationList');

// event handlers for the app object
// this makes it possible for the angular app to hookup into 'app' events
var EventEmitter = require('events').EventEmitter,
	appEvents = new EventEmitter();
// export eventEmitter's 'on' and 'removeAllListeners' functions
exports.on = appEvents.on.bind(appEvents);
exports.removeAllListeners = appEvents.removeAllListeners.bind(appEvents);


var _contentArea;

// ANGULARJS
exports.appState = appState;



var init = exports.init = function () {

	_contentArea = $('#contentArea');

	$('.alert .close').on('click', function () {
		$(this).parent().fadeOut();
	});

	$('.skippy').on('click', function () {
		if ($(this).attr('href') === '#searchTarget') {
			var $searchInput = $('#searchBoxLocal'),
				$searchInputPos = $searchInput.offset();

			$(window).scrollTop($searchInputPos.top - 80);

			// set focus
			$searchInput.focus();
		}
	});

	// Update TP wording for Storefront
	$('#menu-az').text('A-Z Topic Index');

	// Search filter language
	$('.languageOptions .drop-down a').on('click', function (event) {
		event.preventDefault();
		var filter = $(this).data('language');

		// change label to selected language
		$(this).parents('.languageOptions').find('.select-box a').html(filter).data('language', filter);
	});

	$('.searchAdvancedLink').on('click', function (event) {
		event.preventDefault();

		$('.contentPage').advancedSearchPlugin().show();
		$('.featuredContent, .results').hide();
	});

	//$('#share-bar').show();

	setup();
};

// ANGULARJS (extracted from atozPlugin)
function resetAtoZ() {
	$('.a2z-bar a').removeClass('selected');
	if ($('.a2z-bar').is(':visible')) $('#azTab').trigger('click');
}

function bindOptionHandler(root, outputOptions, selector, optName, postProcess) {
	var field = $(selector, root);

	if (!field.length) return;

	var type = field[0].type || field[0].tagName.toLowerCase();

	switch (type) {

		case 'text':
		case 'textarea':
			field.on('keyup change', function () {
				outputOptions[optName] = $(this).val();
				if (postProcess) postProcess();
			});
			break;

		case 'radio':
			field.on('click', function () {
				outputOptions[optName] = $(this).val();
				if (postProcess) postProcess();
			});
			break;

		case 'checkbox':
			field.on('click', function () {
				outputOptions[optName] = $(this).is(':checked');
				if (postProcess) postProcess();
			});
			break;

		case 'select-one':
		case 'select':
			field.on('change', function () {
				outputOptions[optName] = $(this).val();
				if (postProcess) postProcess();
			});
			break;
	}
}



function setup() {

	var queryParams = utils.browser.getQueryParams();

	$('#searchBoxLocal').val('');
	$('.dropLabel').text('All Media Types');

	if (window.location.hash.indexOf('context') >= 0) {
		appState.loadFromHash();

		if (!appState.isEmpty()) {
			$('.featuredContent').hide();
			$('.thumbnail-slider').before($('.searchLocHome'));
		}
	} else if (queryParams.topicid) {
		dataServices.getTagInfo(queryParams.topicid, function (err, data) {
			if (data.length > 0) {
				var topic = {
					'id': data[0].id,
					'name': data[0].name
				};
				return;
			}
		});

	} else if (queryParams.mediaid) {
		appState.ctx.selectedMediaId = queryParams.mediaid;
	} else if (queryParams.mediatype) {
		appState.setSearchMediaType(queryParams.mediatype, queryParams.displayname);
	} else {
		appState.clearSearchParams();
		$('.featuredContent').show();
	}

	//setupNav();
}

function setupNav() {

	$(document).off("keydown").keydown(function (e) {
		// enter pressed
		var $currentFocus = $(document.activeElement);

		if (e.which === 13 || e.keyCode == 13) {
			if ($('.btnSubmitCredentials:visible').length > 0) {
				$('.btnSubmitCredentials').trigger('click');
				return false;
			} else if ($('.btnTosAgree:visible').length > 0) {
				$('.btnTosAgree').trigger('click');
				return false;
			} else if ($('.btnSubmitRegistration:visible').length > 0) {
				$('.btnSubmitRegistration').trigger('click');
				return false;
			} else if ($('.btnResetPassword:visible').length > 0) {
				$('.btnResetPassword').trigger('click');
				return false;
			} else if ($('form.validate #btnSubmit:visible').length > 0 && !$("form.validate .btnAddAnother").is(":focus")) {
				$('form.validate #btnSubmit').trigger('click');
				return false;
			} else if ($('#searchBoxLocal:visible').val()) {
				$('#searchFormLocal .submit').trigger('click');
				return false;
			}

			// click on currently focused item
			$currentFocus.trigger('click');
			return false;
		}
	});
}


var displayMediaItem = exports.displayMediaItem = function (mediaItem, toggleEmbedView) {

	setPageTitle(mediaItem.name);

	var detail = $('.detail', _contentArea),
		generalOptions = {
			mediaItem: mediaItem,
			toggleEmbedView: toggleEmbedView
		};

	$('.detail', _contentArea).hideSpinnerPlugin();

	$('.detail').show();

	switch (mediaItem.mediaType.toUpperCase()) {

		case 'VIDEO':
		case 'WIDGET':
		case 'INFOGRAPHIC':
		case 'IMAGE':
		case 'BUTTON':
		case 'BADGE':
			detail.mediaEmbedPlugin(generalOptions);
			break;
		case 'PDF':
			detail.pdfEmbedPlugin(generalOptions);
			break;
		case 'MICROSITE':
			detail.micrositeEmbedPlugin(generalOptions);
			break;
		case 'HTML':
			generalOptions.bindOptionHandler = bindOptionHandler;
			detail.htmlContentEmbedPlugin(generalOptions);
			break;
		case 'ECARD':
			detail.ecardEmbedPlugin({
				mediaItem: mediaItem,
				toggleEmbedView: false
			});
			break;
		case 'PODCAST':
			generalOptions.navigationHandler = function (mediaId) {
				$('#searchBoxLocal').val('');
				appState.ctx.selectedMediaId = mediaId;
				//displayContent();
			};
			detail.podcastEmbedPlugin(generalOptions);
			break;
		case 'PODCAST SERIES':
			detail.podcastChannelPlugin({
				mediaId: mediaItem.id
			});
			break;

		default: // COLLECTION
			detail.mediaDescriptionPlugin({
				mediaItem: mediaItem
			});
			break;
	}

	var title = $('<div><h1>' + mediaItem.name + '</h1></div>');
	detail.prepend(title);

	$(window).scrollTop(0);
};



// ANGULARJS ONLY:
exports.angular_preProcessForAngularView = function () {
	//$('#share-bar, .socialmediabar, .featuredContent, .mediaSelector, .searchLocContent, .contentPage').hide();
	$('.results, .account, .detail', _contentArea).hide();
	$('.detail', _contentArea).empty();

	// angular view
	$('#TEMP_angular_view_reference').show();
};


function setPageTitle(txt) {
	document.title = _SETTINGS.APP.TITLE + ' - ' + txt;
}


// STUBBING / TESTING OUT METRICS CODE (very early stages)
// var logMetrics = exports.logMetrics = function (interactionString, referringUrl) {

// 	//var formattedStr = interactionString.replace(/ /g, '+');
// 	// var url = "http://mtrics......[domain]...../b/ss/devcdc/1/H.21--NS/0?AQB=1&pccr=true&g=" + referringUrl + "&cl=session&j=1.0&c41=Public%20Health%20Media%20Library&c40=HHS:%20" + formattedStr;

// 	var url = "http://cdc.112.2o7.net/b/ss/devcdc/1/H.21--NS/0?cl=session&j=1.0&c41=Public%20Health%20Media%20Library&c40=HHS:%20High%20School%20YRBS&i=e6da9c64-f59c-47ed-bccd-33ce49d96615";

// 	$.get(url, function () {
// 		console.log('Metrics logged - ' + url);
// 	});

// };
