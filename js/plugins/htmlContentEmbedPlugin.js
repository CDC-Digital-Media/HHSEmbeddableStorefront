'use strict';

var CONFIG = require( '../CONFIG' ),
	embed = require( '../embed' ),
	_PLUGIN_NAME = 'htmlContentEmbedPlugin',
	_defaults = {
		mediaItem: null,
		returnHandler: null,
		toggleEmbedView: false,
		bindOptionHandler: null
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	var _outputOptions = {
		blnStripScripts: true,
		blnStripAnchorTags: false,
		blnStripImages: false,
		blnStripComments: true,
		blnStripInlineStyles: true,
		imageFloat: 'none',
		postProcess: null,
		outputFormat: 'XHTML',
		outputEncoding: 'UTF-8',
		nameSpace: '',
		blnNewWindow: true,
		blnjQueryRef: true
	};

	function main() {

		embed.setupTabs(_target, showPreview, showEmbedForm, true, _options.toggleEmbedView);

		( (_options.toggleEmbedView) ? showEmbedForm : showPreview )();

		embed.setupReturnLink(_target, _options.returnHandler);
	}

	function showPreview() {

		$('.previewPane, .previewNote').show();
		$('.embedForm, .formNote').hide();
		$('.previewPane').showSpinnerPlugin();

		$('.previewPane').htmlContentPlugin({
			mediaId: _options.mediaItem.id,
			stripScripts: _outputOptions.blnStripScripts,
			stripAnchorTags: _outputOptions.blnStripAnchorTags,
			stripImages: _outputOptions.blnStripImages,
			stripComments: _outputOptions.blnStripComments,
			stripInlineStyles: _outputOptions.blnStripInlineStyles,
			imageFloat: _outputOptions.imageFloat,
			postProcess: _outputOptions.postProcess,
			outputFormat: _outputOptions.outputFormat,
			outputEncoding: _outputOptions.outputEncoding,
			nameSpace: _outputOptions.nameSpace,
			newWindow: _outputOptions.blnNewWindow
		});

		embed.buildDescription(_options);
	}

	function showEmbedForm() {

		$('.previewPane, .previewNote, .descriptionContainer').hide();
		$('.embedForm, .formNote').show();

		// just load form once
		if (!$('.embedForm').html()) $('.embedForm', _target).load('templates/htmlEmbedForm.html', setupEmbedForm);
	}

	function setupEmbedForm() {

		$('.txtHostPage, .jsMappingFile').hide();

		$('input:radio[name="mappingOptions"]').change(function () {
			var func = ($(this).is(':checked') && $(this).val() === 'mapDefine') ? 'show' : 'hide';
			('.txtHostPage')[func]();

			func = ($(this).is(':checked') && $(this).val() === 'mapManual') ? 'show' : 'hide';
			$('.jsMappingFile')[func]();
		});

		// wire up options to displayed code block
		_options.bindOptionHandler(_target, _outputOptions, '#stripScripts', 'blnStripScripts', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#stripAnchors', 'blnStripAnchorTags', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#stripImages', 'blnStripImages', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#stripComments', 'blnStripComments', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#stripStyles', 'blnStripInlineStyles', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, 'input[name=imgFloat]', 'imageFloat', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#postprocessFunction', 'postProcess', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#outputFormat', 'outputFormat', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#outputEncoding', 'outputEncoding', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#contentNameSpace', 'nameSpace', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#newWindow', 'blnNewWindow', generateCodeBlock);
		_options.bindOptionHandler(_target, _outputOptions, '#jQueryRef', 'blnjQueryRef', generateCodeBlock);

		$('.displayOptionHelp').bsPopoverExtenderPlugin({
			contentSource: $('.displayOptionHelpContent'),
			cssClass: 'help-htmlDisplayOptions',
			placement: 'right',
			html: true
		});

		$('.scriptOptionHelp').bsPopoverExtenderPlugin({
			contentSource: $('.scriptOptionHelpContent'),
			cssClass: 'help-scriptOptions',
			placement: 'right',
			html: true
		});

		generateCodeBlock();
		//cdc.sf.applyWatermark();
	}

	function generateCodeBlock() {
		//var codeBlock = [],
		//	urlRoot = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + CONFIG.SERVER.WEB_ROOT;

		//codeBlock.push('<!-- Markup for CDC HTMLContent (' + _options.mediaItem.name + ') -->\r');

		//if (_outputOptions.blnjQueryRef) codeBlock.push('<script src="' + urlRoot + '/js/libs/jquery.min.js"></script>\r');

		//codeBlock.push('<script src="' + urlRoot + '/js/plugins/htmlContent_tempPlugin.js"></script>\r');
		//codeBlock.push('\r');
		//codeBlock.push('<div id="' + _options.mediaItem.id.toString() + '" class="CDCContent_' + _options.mediaItem.id.toString() + '"></div>\r');
		//codeBlock.push('<script>\r');
		//codeBlock.push('$(".CDCContent_' + _options.mediaItem.id.toString() + '").htmlContentPlugin({\r');
		//codeBlock.push('   mediaId: ' + _options.mediaItem.id + ',\r');
		//codeBlock.push('   apiRoot: "' + CONFIG.SERVER.API_ROOT + '",\r'); // #DN needs fix
		//codeBlock.push('   stripScripts: ' + _outputOptions.blnStripScripts + ',\r');
		//codeBlock.push('   stripAnchorTags: ' + _outputOptions.blnStripAnchorTags + ',\r');
		//codeBlock.push('   stripImages: ' + _outputOptions.blnStripImages + ',\r');
		//codeBlock.push('   stripComments: ' + _outputOptions.blnStripComments + ',\r');
		//codeBlock.push('   stripInlineStyles: ' + _outputOptions.blnStripInlineStyles + ',\r');
		//codeBlock.push('   imageFloat: "' + _outputOptions.imageFloat + '",\r');

		//if (_outputOptions.postProcess) codeBlock.push('   postProcess: ' + _outputOptions.postProcess + ',\r');

		//codeBlock.push('   of: "' + _outputOptions.outputFormat + '",\r');
		//codeBlock.push('   oe: "' + _outputOptions.outputEncoding + '",\r');
		//codeBlock.push('   ns: "' + _outputOptions.nameSpace + '",\r');
		//codeBlock.push('   nw: ' + _outputOptions.blnNewWindow + '\r');

		//codeBlock.push('})   \r');
		//codeBlock.push('</script>\r');
		//codeBlock.push('<noscript>You need javascript enabled to view this content or go to the <a href="' + CONFIG.SERVER.API_ROOT + CONFIG.SERVER.ROOT_URL + '/media/' + _options.mediaItem.id.toString() + '/noscript">source URL</a>.</noscript>\r');

		var $root = $('.embedForm');
		var $preEmbed = $root.find('.jsEmbedBlock textarea');
		$preEmbed.val(_options.mediaItem.embedCode);

		//var scriptTag = _options.mediaItem.embedCode.substring(_options.mediaItem.embedCode.indexOf("<script"), _options.mediaItem.embedCode.indexOf("</script>") + 9);

		//var $embedCode = $('<div>').html(_options.mediaItem.embedCode);
		//var $optionDiv = $embedCode.find('div').first();

		/*
		data-stripscripts='false'
		data-stripanchors='false'
		data-stripimages='false'
		data-stripcomments='false'
		data-stripstyles='false' data-imagefloat=''
		data-cssclasses=''
		data-ids=''
		data-xpath=''
		data-oe=''
		data-of=''
		data-ns=''
		data-nw='false'
		*/
/*
		$optionDiv.attr('data-stripscripts', _outputOptions.blnStripScripts);
		$optionDiv.attr('data-stripanchors', _outputOptions.blnStripAnchorTags);
		$optionDiv.attr('data-stripimages', _outputOptions.blnStripImages);
		$optionDiv.attr('data-stripcomments', _outputOptions.blnStripComments);
		$optionDiv.attr('data-stripstyles', _outputOptions.blnStripInlineStyles);
		$optionDiv.attr('data-imagefloat', _outputOptions.imageFloat);
		$optionDiv.attr('data-oe', _outputOptions.outputEncoding);
		$optionDiv.attr('data-of', _outputOptions.outputFormat);
		$optionDiv.attr('data-ns', _outputOptions.nameSpace);
		$optionDiv.attr('data-nw', _outputOptions.blnNewWindow);
		if (_outputOptions.postProcess)
			$optionDiv.attr('data-postprocess', _outputOptions.postProcess);


		var codeString = $embedCode[0].innerHTML.toString();
		// need to add script tag back in.
		var output = [codeString.slice(0, codeString.indexOf('</div>') + 6), scriptTag, codeString.slice(codeString.indexOf('</div>') + 6)].join('');

		$preEmbed.val(output);
*/
		$preEmbed.on('click', function () {
			this.focus();
			this.select();
		});
	}

	main();

	return this;
};