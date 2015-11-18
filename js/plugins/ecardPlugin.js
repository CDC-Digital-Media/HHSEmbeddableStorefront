'use strict';

var validator = require( 'validator' ),
	CONFIG = require( '../CONFIG' ),
    utils = require( '../utils' ),
    dataServices = require( '../dataServices' ),
	_PLUGIN_NAME = 'ecardPlugin',
	_defaults = {
		mediaId: '',
		cssClass: 'csEcard',
		filePath: '',
		returnNavigation: {
			text: 'Choose another eCard',
			navigateUrl: ''
		},
		completeNavigation: {
			text: 'Choose another eCard',
			navigateUrl: ''
		},
		receiptUrl: ''
	},
	_disclaimerSender = '<p>DISCLAIMER</p><p>CDC\'s Health-e-Cards allow the public to send electronic greeting cards to friends, family, and co-workers. To personalize this service, you are allowed to send personal messages with a limit of 500 characters or less.</p><p>When using the personal message feature in CDC\'s Health-e-Cards, you are responsible for the content of the message. Please note:</p><ul><li>Comments and views expressed in the personal message feature are those of the individual sending the response and do not necessarily reflect those of the CDC/HHS or the Federal government.</li><li>CDC/HHS does not control or guarantee the accuracy, relevance, timeliness or completeness of the information sent in a personal message.</li><li>CDC/HHS does not endorse content or links provided in a personal message.</li><li>CDC/HHS does not authorize the use of copyrighted materials contained in a personal message. Those who provide comments are responsible for the copyright of the text they provide.</li><li>CDC\'s Health-e-Cards follow the .....[domain]..... privacy policy. CDC will not share or sell any personal information obtained from users with any other organization or government agency except as required by law. Please view all of our policies and regulations at <a href="http://www......[domain]...../Other/policies.html">http://www......[domain]...../Other/policies.html.</a></li></ul>',
	_disclaimerRecipient = '<p>DISCLAIMER</p><p>Comments and views expressed in the personal message feature are those of the individual sending the personal message and do not necessarily reflect those of the Centers for Disease Control and Prevention (CDC), the Department of Health and Human Services (DHHS) or the Federal government. CDC/DHHS does not control or guarantee the accuracy or relevance of the information sent in a personal message, nor does CDC/DHHS endorse any content or links provided therein. To report abuse please send an email to <a href="senderEmail1@email">senderEmail1@email</a>',
	_successMsg = '<p class="csEcard_successHeader">Your eCard was successfully sent!</p><p>Thank you for using CDC\'s Health-e-Card system and helping us with our mission of safer, healthier people.</p>';

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options),
		_ecard, _root;

	_options.receiptUrl = _options.receiptUrl || document.location;

	function htmlEscape(str) {
		return String(str)
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
	}

	function buildEcard() {
		_target.children().remove();

		_root = $('<div class="' + _options.cssClass + '">');
		_target.append(_root);

		var $cardContainer = $('<div class="csEcard_card" id="cardDiv">');
		_root.append($cardContainer);

		var $mailForm = $('<div class="csEcard_form">');
		_root.append($mailForm);

		var $ctrlContainer = $('<div class="csEcard_ctrlContainer">');
		$mailForm.append($ctrlContainer);

		var $requiredNote = $('<span class="csEcard_requiredNote">').append('<span class="csEcard_warning">*</span> Required |&nbsp;');
		$ctrlContainer.append($requiredNote);

		var $showFront = $('<a href="#"" class="csEcard_viewFront">View front of Card</a>');
		$ctrlContainer.append($showFront);

		var $recipients = $('<div class="csEcard_recipients">')
							.append('<div>Send this eCard to</div>');
		$mailForm.append($recipients);

		var $recipient = $('<div class="csEcard_recipient">')
							.append('<input type="text" class="csEcard_recipName" placeholder="Recipient Name"/>')
							.append('<span class="csEcard_warning">*</span>')
							.append('<input type="text" class="csEcard_recipEmail" placeholder="Email Address"/>')
							.append('<span class="csEcard_warning">*</span>');

		$recipients.append($recipient);

		var $addRecipient = $('<div class="csEcard_addRecipient">')
							.append('Would you like to <a href="#" class="csEcard_addRecipentLink">Add another Recipient</a>?');

		$mailForm.append($addRecipient);

		var $msg = $('<div class="csEcard_message">')
							.append('<div class="csEcard_msgHeader">Personal Message</div>')
							.append('<textarea class="csEcard_msgArea" rows="4"></textarea>')
							.append('<div class="csEcard_msgWarning">Please limit the message to 500 characters or less and special characters like &lt;&gt; are not accepted.</div>');

		$mailForm.append($msg);

		var $sender = $('<div class="csEcard_sender">')
							.append('<div>From</div>')
							.append('<input type="text" class="csEcard_senderName" placeholder="Your Name"/>')
							.append('<span class="csEcard_warning">*</span>')
							.append('<input type="text" class="csEcard_senderEmail" placeholder="Email Address"/>')
							.append('<span class="csEcard_warning">*</span>');

		$mailForm.append($sender);

		var $disclaimer = $('<div class="csEcard_disclaimer">').html(_disclaimerSender);
		$mailForm.append($disclaimer);

		var $success = $('<div class="csEcard_success">').html(_successMsg);
		$mailForm.append($success);

		var $navigation = $('<div class="csEcard_navigation typeG row">')
							.append('<a class="btn btn-default csEcard_preview" href="#">Preview this eCard</a>')
							.append('<a class="btn btn-default csEcard_edit span3" href="#">Edit this eCard</a>')
							.append('<div class="csEcard_copySelf span3"><input type="checkbox" class="csEcard_chkCopySelf"> Send me a copy</div>')
							.append('<a class="btn btn-default csEcard_send span3" href="#">Send this eCard</a>')
							.append('<a class="btn btn-default csEcard_restart" href="#">Send this eCard to someone else.</a>');

		if (_options.returnNavigation && _options.returnNavigation.text && _options.returnNavigation.navigateUrl) {
			$navigation.append('<a class="csEcard_btn csEcard_return" href="' + _options.returnNavigation.navigateUrl + '">' + _options.returnNavigation.text + '</a>');
		}

		if (_options.completeNavigation && _options.completeNavigation.text && _options.completeNavigation.navigateUrl) {
			$navigation.append('<a class="csEcard_btn csEcard_complete" href="' + _options.completeNavigation.navigateUrl + '">' + _options.completeNavigation.text + '</a>');
		}

		$mailForm.append($navigation);

		_root.find('.csEcard_success, .csEcard_edit, .csEcard_copySelf, .csEcard_send, .csEcard_restart, .csEcard_complete').hide();
	}

	function attachEvents() {
		//applyWatermark();

		_root.find('.csEcard_viewFront').on('click', function () {
			_root.find('.csEcard_card').children().remove();
			buildOutCardDisplay(_root.find('.csEcard_card'));
			return false;
		});

		_root.find('.csEcard_addRecipentLink').on('click', function () {

			var $recRow = _root.find('.csEcard_recipient').first().clone();
			$recRow.find('.csEcard_warning').remove();

			$recRow.find('input').each(function() {
				$(this).val('');
			});

			_root.find('.csEcard_recipients').append($recRow);

			//applyWatermark();
			_root.find('.csEcard_recipName').last().focus();

			if (_root.find('.csEcard_recipient').length === 5) _root.find('.csEcard_addRecipentLink').parent('div').hide();

			return false;
		});

		_root.find('.csEcard_msgArea')
			.on( 'keydown keyup blur', function(event) {
				checkLength(event, this.value.length, 500);
			});

		_root.find('.csEcard_preview').on('click', function () {
			if (validateForm()) {
				showPreview();
				$('html, body').animate({
					scrollTop: _root.find('.csEcard_card').offset().top
				}, 0);
			}
			return false;
		});

		_root.find('.csEcard_edit').on('click', function() {
			showEdit();
			return false;
		});

		_root.find('.csEcard_send').on('click', function() {
			sendEcard();
			return false;
		});
	}

	function sendEcard() {

		var obj = {},
			recipName = $('.csEcard_recipName').map(function() {
				return htmlEscape($(this).val());
			}).get(),
			recipEmail = $('.csEcard_recipEmail').map(function() {
				return htmlEscape($(this).val());
			}).get(),
			senderName = htmlEscape($('.csEcard_senderName').val()),
			senderEmail = htmlEscape($('.csEcard_senderEmail').val()),
			arRecipient = [];

		$(recipName).each(function (index, item) {

			if (recipName[index] !== '' && recipEmail[index] !== '') {
				arRecipient.push({
					name: recipName[index],
					emailAddress: recipEmail[index]
				});
			}

		});

		if ($('.csEcard_chkCopySelf').is(':checked')) {
			arRecipient.push({
				name: senderName,
				emailAddress: senderEmail
			});
		}

		var urlRoot = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + CONFIG.SERVER.WEB_ROOT;

		var data = {
			recipients: arRecipient,
			personalMessage: htmlEscape($('.csEcard_msgArea').val()),
			senderName: senderName,
			senderEmail: senderEmail,
			isFromMobile: false,
			eCardApplicationUrl: encodeURIComponent(urlRoot + _options.receiptUrl)
		};

		dataServices.sendEcard( data, _options.mediaId, function( err, data, meta ) {
			if (meta.status === 200) {
				utils.misc.scrollToTop();

				_root.find('.csEcard_card, .csEcard_messageRcpt, .csEcard_disclaimer, .csEcard_edit, .csEcard_copySelf, .csEcard_send, .csEcard_viewFront').hide();
				_root.find('.csEcard_success, .csEcard_restart, .csEcard_complete').show();

				_root.find('.csEcard_restart').on('click', function() {
					main();
					return false;
				});
			}
		});
	}

	function htmlEncode(value) {
		//create a in-memory div, set it's inner text(which jQuery automatically encodes)
		//then grab the encoded contents back out.  The div never exists on the page.
		return $('<div/>').text(value).html();
	}

	function showPreview() {
		_root.find('.csEcard_card').children().remove();
		buildOutCardDisplay(_root.find('.csEcard_card'));

		_root.find('.csEcard_requiredNote, .csEcard_recipients, .csEcard_addRecipient, .csEcard_message, .csEcard_sender').hide();
		_root.find('.csEcard_disclaimer').html(_disclaimerRecipient);

		var $msgRecipient = $('<div class="csEcard_messageRcpt">')
							.append('<div class="csEcard_msgRcptHeader">Your friend included a personal message to you:</div>')
							.append('<div class="csEcard_msgRcptContent">' + htmlEncode(_root.find('.csEcard_msgArea').val()) + '</div>')
							.append('<div class="csEcard_msgRcptSalutation">Sincerely,</div>')
							.append('<div class="csEcard_msgSenderName">' + _root.find('.csEcard_senderName').val() + '</div>');

		_root.find('.csEcard_ctrlContainer').after($msgRecipient);
		_root.find('.csEcard_return, .csEcard_preview').hide();
		_root.find('.csEcard_edit, .csEcard_copySelf, .csEcard_send').show();
	}

	function showEdit() {
		_root.find('.csEcard_card').children().remove();
		buildOutCardDisplay(_root.find('.csEcard_card'));

		if (_root.find('.csEcard_recipient').length < 5) _root.find('.csEcard_addRecipient').show();

		_root.find('.csEcard_requiredNote, .csEcard_recipients, .csEcard_message, .csEcard_sender, .csEcard_return, .csEcard_preview').show();
		_root.find('.csEcard_messageRcpt, .csEcard_edit, .csEcard_send, .csEcard_copySelf').hide();
		_root.find('.csEcard_disclaimer').html(_disclaimerSender);
	}

	function buildOutCardDisplay($container) {
		var doFlash = false,
			html = [];

		if (document.createElement('canvas').getContext && _ecard.extension.html5Source) {
			html.push('<iframe class="html5Frame" width="580px" height="400px" scrolling="no" src="' + _ecard.extension.html5Source + '"></iframe>');
		} else if (_ecard.sourceUrl) {
			doFlash = true;

			html.push('<div id="flashContentALT">');
			html.push('	<a title="' + _ecard.name + '" href="' + _ecard.targetUrl + '">');
			// need resource for alternate image rather than relying on the source imgage used for moble.
			html.push('		<img title="' + _ecard.name + '" src="' + _ecard.extension.imageSourceOutsideLarge + '" alt="' + _ecard.name + '" class="cardImg" />');
			html.push('	</a>');
			html.push('</div>');
		}

		$container.append(html.join(''));

		// have to apply after HTML has been added to DOM
		if (doFlash) {
			var Myflash = new CDC.Video('', 'flashContentALT', 'MyEcardsButton', true, '100%', '400', _ecard.sourceUrl, '100%', '400', _ecard.sourceUrl, false);
			Myflash.render();
		}
	}

	function validateForm() {
		var isvalid = true;

		// verify that recipient fields are appropriately filled (matched).
		_root.find('.csEcard_recipEmail').each(function () {
			if (isvalid && !$(this).val() && $(this).parents('div').first().find('.csEcard_recipName').val()) {
				alert('Please enter an email address for each recipient name.');
				isvalid = false;
				return;
			}
		});

		_root.find('.csEcard_recipName').each(function () {
			if (isvalid && !$(this).val() && $(this).parents('div').first().find('.csEcard_recipEmail').val()) {
				alert('Please enter a name for each recipient email address.');
				isvalid = false;
				return;
			}
		});
		// verify that values in email fields are in email formats
		_root.find('.csEcard_recipEmail').each(function () {
			if (isvalid && $(this).val()) {
				if (!validator.isEmail($(this).val())) {
					alert('"' + $(this).val() + '" is not a valid email address.');
					isvalid = false;
					return;
				}
			}
		});

		// verify that at least one email address exists
		var empty = true;
		_root.find('.csEcard_recipEmail').each(function () {
			if ($(this).val()) {
				empty = false;
				return;
			}
		});

		if (isvalid && empty) {
			alert('Please enter name and email of at least one recipient.');
			isvalid = false;
		}

		if (isvalid && !$('.csEcard_senderName').val()) {
			alert('Please enter your name.');
			isvalid = false;
		}

		if (isvalid && !$('.csEcard_senderEmail').val()) {
			alert('Please enter your email address.');
			isvalid = false;
		}

		if (isvalid && !validator.isEmail(_root.find('.csEcard_senderEmail').val())) {
			alert('"' + _root.find(".csEcard_senderEmail").val() + '" is not a valid email address.');
			isvalid = false;
		}

		return isvalid;
	}

	function checkLength(e, length, maxlength) {
		if (length < maxlength) return true;

		var keyID = window.event ? window.event.keyCode : e.keyCode;
		if ((keyID >= 37 && keyID <= 40) || (keyID === 8) || (keyID === 46)) {
			if (window.event) e.returnValue = true;
		} else if (window.event) {
			e.returnValue = false;
		} else {
			e.preventDefault();
		}
	}

	function main() {
		buildEcard();
		buildOutCardDisplay($('.csEcard_card'));
		attachEvents(_ecard);
	}

	dataServices.getMediaItem(_options.mediaId, function(err, data) {
		_ecard = data;
		main();
	});
};
