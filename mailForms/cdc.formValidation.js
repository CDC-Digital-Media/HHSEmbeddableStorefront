
if (CDC && CDC.Global) { CDC.Global.settings.enableShareButtons = false; };

$(document).ready(function() {

	if (typeof Modernizer !== 'undefined' && !Modernizr.input.pattern) {
		$('form.validate input[data-inputmask]').each(function() {
			$(this).inputmask($(this).data('inputmask').replace(/\'mask\':/gi, '').replace(/\'/g, '').trim(), { showMaskOnHover : false });
		});
		$('form.validate input[type=email]').each(function() {
			$(this).inputmask('Regex', { regex: "[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+" });
		});
	}

	if (typeof Modernizer !== 'undefined' && !Modernizr.input.placeholder) {
		var attempts = 0;
		var timer = setInterval(function(){
			if ($.watermark) {
				clearInterval(timer);
				$('form.validate input[placeholder]').each(function() {
					$(this).watermark($(this).attr('placeholder'));
				});
			} else {
				attempts++;
				if (attempts > 5) {
					log('Timed out waiting for watermark support to load');
				}
			}
		}, 500);
	}

	$('form.validate').validate({
		errorPlacement: function(error, element) {
			if (element.parents("div#recaptcha_area").length > 0) {
				error.appendTo(element.parents("div#recaptcha_area"));
			} else {
				error.appendTo(element.parent());
			}
		},
		rules: {
			recaptcha_response_field: {
				required: true
			}
		},
		messages: {
			recaptcha_response_field: 'A response to this challenge is required'
		}
	});

	$('form.validate').submit(function() {
		var theForm = $(this);
		if (theForm.valid() && (theForm.attr('method') === 'get')) {
			// Set the recipient based on input for Email this Page.
			if ($('div#emailLinkBody').length > 0) {
				$('input[name="RCPT"]').val($('input#toEmail').val());
			}
			var url = theForm.attr('action') + '?callback=?';
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: url,
				data: $(this).serialize() // serializes the form's elements.
			}) //check result set to see if data is a string or JSON object
			.done(function(data) {
				if (typeof data === 'string'){
					var apiResult = JSON.parse(data);  
					if (typeof apiResult === 'object'){
							var result = apiResult.result;						
					} else {
							var result = 'error-challenge-failed';						
					}
				} else {
					var result = data.result;
				}
				if (result === 'error-challenge-failed') {
					theForm.find('.form-group.challenge').each(function() {
						$(this).children('label.error').remove();
						$(this).append($('<label class="error" />').html('Incorrect answer provided for challenge'));
					});
				} else {
					// success
					var decoded;
					var val = data.response;
					var bodyStart = val.indexOf('&lt;body');
					if (bodyStart === -1) {
						bodyStart = val.indexOf('<body');
						val = val.substring(bodyStart);
						if (bodyStart > -1) {
							val = val.replace('</html>', '');
							val = val.replace('<body', '<div');
							val = val.replace('</body>', '</div>');
							val = val.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/gim, '');
							var xmlDoc;
							var parser;
							decoded = val;
						}
					} else {
						val = val.substring(bodyStart);
						if (bodyStart > -1) {
							val = val.replace('&lt;/html&gt;', '');
							val = val.replace('&lt;body', '&lt;div');
							val = val.replace('&lt;/body&gt;', '&lt;/div&gt;');
							decoded = $("<div/>").html(val).text();
						}
					}
					var page = $(decoded);
					var contentArea;
					if (page.find('#contentArea').length > 0) {
						contentArea = page.find('#contentArea')[0].innerHTML;
						if ($('#content .main-inner').length > 0) {
							$('#content .main-inner').html(contentArea);
						} else if ($('#contentArea').length > 0) {
							$('#contentArea').html(contentArea);
						} else {
							$('body').html(contentArea);
						}
					} else if (page.find('#content .main-inner').length > 0) {
						contentArea = page.find('#content .main-inner')[0].innerHTML;
						if ($('#content .main-inner').length > 0) {
							$('#content .main-inner').html(contentArea);
						} else if ($('#contentArea').length > 0) {
							$('#contentArea').html(contentArea);
						} else {
							$('body').html(contentArea);
						}
					} else {
						var responsePageUrl = $('form.validate input[type="hidden"][name="refer"]').val();
						window.location = responsePageUrl;
					}
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				//log('AJAX failed: ' + textStatus + ' - ' + errorThrown);
			});
			return false; // avoid to execute the actual submit of the form.
		} else {
			return true;
		}
	});
});
