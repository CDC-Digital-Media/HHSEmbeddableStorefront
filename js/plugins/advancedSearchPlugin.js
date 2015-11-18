'use strict';

var CONFIG = require('../CONFIG'),
	utils = require('../utils'),
	dataServices = require('../dataServices'),
	_PLUGIN_NAME = 'advancedSearchPlugin',
	_defaults = {
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options),
		_user = null;

	function handleSubmitClick() {
		_options.submitHandler();
	}

	var _data = [],
		valueArray = [];

	function main() {
		_target.empty();

		var searchAdvanced = $('<div>');
		searchAdvanced.load('templates/searchAdvanced.html', function () {

			_target.append(searchAdvanced);

			// media type list
			var medType = searchAdvanced.find('.mediaLaunchbar').mediaTypeDropdownPlugin({
				selectedValue: '',
				selectHandler: function (mediaType, displayName) {
					medType.setSelected(mediaType);
				}
			});

			dataServices.getTopicIndex('', function (err, data) {

				$(data).each(function () {
					var outer = $(this)[0];
					$(outer.items).each(function () {
						var inner = $(this)[0];
						_data.push(inner);
					});
					outer.items = null;
					_data.push(outer);

				});

				$(_data).map(function () {
					this.valueName = $('<div />').html(this.name).text();
				});

				valueArray = $(_data).map(function () { return this.valueName; }).toArray();

				searchAdvanced.find('#topicSearch').typeahead({
					source: valueArray,
					updater: function (term) {

						var selectedTerm = $.grep(_data, function (t) {
							return t.valueName == term;
						})[0];

						var ul = searchAdvanced.find('#selectedTopicList');
						var li = $('<li topicId="' + selectedTerm.id + '"><span style="display:inline-block; width:350px;">' + term + '</span><button class="close" onclick="$(this).parents(\'li\').remove();" type="button">x</button></li>');

						ul.append(li);
						searchAdvanced.find('#topicSearch').focus();
						return '';
					}
				});
			});
		});
	}

	main();

	return this;
};