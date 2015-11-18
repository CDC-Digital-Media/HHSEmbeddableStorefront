'use strict';

var appState = require('./appState'),
utils = require('./utils');

exports.setupTabs = function (target, previewHandler, embedFormHandler, showTabNotes, toggleEmbedView) {

	var $tabDiv = $('<div class="tabs ui-tabs ui-widget ui-widget-content ui-corner-all" id="TabSet-10" style="visibility: visible;">'),
	$ul = $('<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">');

	$ul.append('<li tabindex="0" class="ui-state-default ui-corner-top ui-tabs-active ui-state-active previewTab" role="tab" aria-selected="true" aria-controls="tabs-1" aria-labelledby="ui-id-10"><a tabindex="-1" class="ui-tabs-anchor" id="ui-id-10" role="presentation" href="#tabs-10">Preview</a></li>');
	$ul.append('<li tabindex="-1" class="ui-state-default ui-corner-top embedTab" role="tab" aria-selected="false" aria-controls="tabs-2" aria-labelledby="ui-id-20"><a tabindex="-1" class="ui-tabs-anchor" id="ui-id-20" role="presentation" href="#tabs-20">Get Embed Code</a></li>');

	var $tabContent = $('<div class="cs_tabPreview ui-tabs-panel ui-widget-content ui-corner-bottom clearfix" id="tabs-10" role="tabpanel" aria-expanded="true" aria-hidden="false" aria-labelledby="ui-id-10">');
	$tabContent.after('<div class="cs_tabEmbed ui-tabs-panel ui-widget-content ui-corner-bottom clearfix" id="tabs-20" role="tabpanel" aria-expanded="false" aria-hidden="true" aria-labelledby="ui-id-20">');

	var $previewNote = $('<div class="info previewNote"><small>Note: This tab displays content according to the options on the <a href="#">Get Embed Code</a> tab.</small></div>'),
	$formNote = $('<div class="info formNote"><small>Note: To see the results of the options you select, you can view them on the <a href="#">Preview</a> tab.</small></div>');

	function setPreviewActive() {
		$ul.find('li').removeClass('ui-tabs-active ui-state-active');
		$ul.find('.previewTab').addClass('ui-tabs-active ui-state-active');
		$formNote.hide();

	}

	function setEmbedActive() {
		$ul.find('li').removeClass('ui-tabs-active ui-state-active');
		$ul.find('.embedTab').addClass('ui-tabs-active ui-state-active');
		$previewNote.hide();
	}

	function togglePreviewPane() {
		$('.previewPane div').toggle();
	}

	function toggleMask() {
		var html = [];
		html.push('<div class="mask"></div>');

		$('body').append(html);

		$('.mask').on('click', function () {
			$('.descriptionContainer').toggle();
			$('.mask').remove();
		});
	}

	$ul.find('.previewTab').on('click', function (event) {
		setPreviewActive();

		target.find('.cs_tabPreview').show();
		target.find('.cs_tabEmbed').hide();

		if (previewHandler) previewHandler();

		event.preventDefault();
	});

	$ul.find('.embedTab').on('click', function (event) {

		event.preventDefault();

		//6/10/2014 - Fred has asked for a cookie to make the unregistered ToS appear only once.
		if (!window.sessionStorage.userData && !$.cookie('UnregisteredTosAgreement')) {
			$('#modalTos').load('templates/modalUsageGuidelines.html', function () {

				$('#modalTos .modal-body').load('templates/usageGuidelines.html', function () {

					// handle flash and video and pdf objects that may float over tos modal.
					$('.previewPane object, .previewPane .video-embed-container').hide();
					$('#modalTos').modal('show');

					$('.btnTosAgree').on('click', function (event) {
						event.preventDefault();
						$.cookie('UnregisteredTosAgreement', true);
						$('.previewPane object, .previewPane .video-embed-container').show();
						$('#modalTos').modal('hide');
						setEmbedActive();

						target.find('.cs_tabPreview').hide();
						target.find('.cs_tabEmbed').show();

						if (embedFormHandler) embedFormHandler();
					});

					$('.btnTosCancel').on('click', function (event) {
						event.preventDefault();
						alert('You must agree to our Usage Guidelines in order to download Embed Code.');
						$('.previewPane object, .previewPane .video-embed-container').show();
						$('#modalTos').modal('hide');
					});

					$('.modal .close').on('click', function () {
						// handle flash and video and pdf objects that may float over tos modal.
						$('#modalTos').modal('hide');
						$('.previewPane object, .previewPane .video-embed-container').show();
					});
				});
			});
		} else {
			setEmbedActive();

			target.find('.cs_tabPreview').hide();
			target.find('.cs_tabEmbed').show();

			if (embedFormHandler) embedFormHandler();
		}
	});

	$tabDiv
	.append($ul)
	.append($tabContent);

	target.append($tabDiv);



	var $divEmbed = $('<div class="embedForm">');
	$('.cs_tabEmbed', target).append($divEmbed);

	var $divPreview = $('<div class="previewPane span16">'),
	moreInfo = '<div class="moreInfo"><div class="moreInfoBtn"><a href="#">Media Detail <span class="icon-angle-down"></span></a></div></div>';

	$('.cs_tabPreview', target).append(moreInfo).append($divPreview);

	if (showTabNotes) {
		$previewNote.find('a').on('click', function () {
			$ul.find('.embedTab').trigger('click');
			return false;
		});

		$formNote.find('a').on('click', function () {
			$ul.find('.previewTab').trigger('click');
			return false;
		});

		$('.cs_tabPreview', target).prepend($previewNote);
		$('.cs_tabEmbed', target).prepend($formNote);
	}

	if (toggleEmbedView) {
		setEmbedActive();
		target.find('.cs_tabPreview').hide();
		target.find('.cs_tabEmbed').show();
	} else {
		target.find('.cs_tabPreview').show();
		target.find('.cs_tabEmbed').hide();
	}

	// attach add to list
	//$('.ui-tabs-nav', target).prepend($addToList);

	$('.moreInfoBtn a').on('click', function (e) {
		e.preventDefault();
		$(this).parents('.moreInfo').find('.descriptionContainer').toggle();

		toggleMask();
	});

};

exports.setupReturnLink = function (target, returnHandler) {

	if (returnHandler) {
		if (!$('.results .cs-tile').length) return;

		var returnLink = $('<i class="icon-angle-left"></i> &nbsp;<a class="returnToResults" href="#">Return to List</a>');

		returnLink.on('click', function (event) {
			event.preventDefault();
			utils.misc.scrollToTop();
			returnHandler();
		});

		target
		.append(returnLink)
		.prepend(returnLink.clone(true));
	}
};

exports.generateRawCodeBlock = function (options, clonePreview) {

	if (!options.mediaItem.id) {
		alert('No Media Id was specified.');
		return;
	}

	var $root = $('.embedForm'),
	$preEmbed = $root.find('.htmlEmbedBlock textarea'),
	codeBlock = '';

	if (clonePreview) {
		codeBlock += $('.previewPane').html();
		$preEmbed.text(codeBlock);
	} else {
		codeBlock += options.mediaItem.embedCode;
		$('textarea.codeBlock').val(codeBlock);
	}

	$preEmbed.on('click', function () {
		this.focus();
		this.select();
	});
};

exports.buildDescription = function (options) {
	var description = $('.descriptionContainer');

	if (!description.length) {
		description = $('<div class="descriptionContainer span6 module-typeF" style="display:none;"><div class="description"></div></div>');
		$('.moreInfoBtn').after(description);
	}

	description.mediaDescriptionPlugin({
		mediaItem: options.mediaItem
	});
};