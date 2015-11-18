'use strict';

var _ = require( 'lodash' ),
	validator = require( 'validator' ),
	dataServices = require( '../dataServices' ),
	LOCATION = require( '../SETTINGS' ).LOCATION,
	_PLUGIN_NAME = 'organizationPlugin',
	_defaults = {
		organizationId: '',
		cancelHandler: null,
		completeHandler: null,
		showRequired: true
	};

$.fn[_PLUGIN_NAME] = function (options) {

	var _target = this,
		_options = $.extend({}, _defaults, options);

	function main() {
		_target.empty();

		var org = $('<div>').load('templates/organization.html', function () {
			_target.append(org);

			if (!_options.showRequired) $('.requiredNote', _target).hide();

			org.show();

			setupOrganization();
		});
	}

	function setupOrganization() {

		// setup typeahead and a-z list
		getOrganizations();

		// setup location fields
		$('.location', _target).prop('disabled', true);

		getPlaces( '', $( '#selectContinent' ), LOCATION.CONTINENT.NORTH_AMERICA );

		getPlaces( LOCATION.CONTINENT.NORTH_AMERICA, $( '#selectCountry' ), LOCATION.COUNTRY.USA );

		getPlaces( LOCATION.COUNTRY.USA, $( '#selectState' ) );

		$('.location').change(function() {

			var placeId = parseInt( $(this).find(':selected')[0].value, 10),
				$locFields = $('.location'),
				index = $locFields.index($(this));

			if (placeId) {
				index++;
				if (index < $locFields.length) {
					getPlaces( placeId, $($('.location')[index]) );
				}
			}

			$('.location:gt(' + (index) + ')').each(function() {
				$(this).prop('disabled', true).children('option:not(:first)').remove();
			});

			if (placeId === LOCATION.CONTINENT.NORTH_AMERICA) {
				//Select U.S. if North America
				getPlaces( LOCATION.CONTINENT.NORTH_AMERICA, $( '#selectCountry' ), LOCATION.COUNTRY.USA );

				getPlaces( LOCATION.COUNTRY.USA, $( '#selectState' ) );
			}
		});

		$('#orgType').orgTypeDropdownPlugin({});

		$('#orgType').change(function() {
			var type = $(this).find(':selected')[0].value;
			$('#txtTypeOther').parents('.control-group')[ (type === 'Other') ? 'show' : 'hide' ]();
		});

		if (_options.organizationId) {
			$('.chooseOrg').hide();
			$('.newOrg').show();
		}

		$('.chooseOrg .btnCancel').on('click', function() {
			$('#txtOrg').val('').focus();
			if (_options.cancelHandler) _options.cancelHandler();
		});

		$('.btnAddNewOrg').on('click', function () {
			$('#orgName').val($('#txtOrg').val());
			$('#txtOrg').val('');
			$('.chooseOrg').hide();
			$('.newOrg').show();
		});

		$('.btnCancelNewOrg').on('click', function () {
			$('.chooseOrg').show();
			$('.newOrg').hide();
		});

		$('.orgSelected .btnCancel').on('click', function() {
			$('#txtOrg').val('').focus();
			orgCleared();
		});

		// setup domain rows and add new domain link
		$('.newOrg .addDomain').on('click', function () {
			var $domRow = $('.domainRow').first().clone();
			$domRow.find('.control-label').text('');
			$domRow.find('.txtDomain').val('');
			$domRow.find('.controls').append($('<button type="button" class="close" onclick="$(this).parents(\'.domainRow\').remove();$(\'.domainRowAdd\').show();">&times;</button>'));
			$('.newOrg .domainRowAdd').before($domRow);

			if ($('.domainRow').length >= 5) $('.domainRowAdd').hide();

			$('.txtDomain').last().focus();

			return false;
		});

		// domain help icon.
		$('.domainHelp').bsPopoverExtenderPlugin({
			contentSource: $('.domainHelpContent'),
			cssClass: 'help-registrationDomain',
			placement: 'right'
		});
	}

	function getPlaces(gId, currentField, selectedId) {

		dataServices.getLocations( gId, function( err, data ) {

			var locFields = $('.location'),
				index = locFields.index(currentField) - 1;

			currentField.children('option:not(:first)').remove();

			_.forEach(data, function(value) {
				var option = $('<option value="' + value.geoNameId + '">' + value.name + '</option>');
				if (value.geoNameId === selectedId) option.prop('selected', true);
				currentField.append(option);
			});

			if (data.length > 0) {
				currentField.prop('disabled', false).addClass('active');
				locFields.parents('.control-group').show();
			} else {
				locFields.parents('.control-group:gt(' + index + ')').hide();
			}
		});
	}

	function getOrganizations() {

		$('#txtOrg').prop('disabled', true);

		dataServices.getOrganizations(function( err, data ) {

			var typeAheadDisplay = [],
				typeAheadMapping = {};

			_.forEach(data, function (value) {

				var orgName = value.name;

				if (value.city) orgName += ' ' + value.city;
				if (value.stateProvince) orgName += ', ' + value.stateProvince;

				_.forEach(value.website, function(value) {
					if (value.isDefault && value.url) orgName += ' ' + value.url;
				});

				typeAheadMapping[ orgName ] = value.id;

				typeAheadDisplay.push( orgName );
			});

			setupTypeAhead($('#txtOrg'), typeAheadDisplay, typeAheadMapping );
			setupAtoZ( data );
			if (_options.completeHandler) _options.completeHandler();
		});
	}

	function selectedOrg(id) {

		$('.chooseOrg .cmdButtons').hide();

		var orgSelected = $('.orgSelected');

		dataServices.getOrganization(id, function( err, data ) {

			var domains = _.pluck(data.website, 'url').join('<br/>');

			orgSelected.find('.orgName').text(data.name || '');
			orgSelected.find('.orgType').text(data.type || '');
			orgSelected.find('.orgCountry').text(data.country || '');
			orgSelected.find('.orgState').text(data.stateProvince || '');
			orgSelected.find('.orgCounty').text(data.county || '');
			orgSelected.find('.orgDomain').html(domains);

			orgSelected.show();
			$('.orgSelected .cmdButtons').show();
		});
	}

	function orgCleared(orgName) {
		$('.chooseOrg .cmdButtons').show();

		var orgSelected = $('.orgSelected');
		orgSelected.find('.orgName').text('');

		$('#txtOrg').data('orgid', null);
		//TODO:  Add fields
		orgSelected.hide();
		$('.orgSelected .cmdButtons').hide();
	}

	function setupTypeAhead( field, typeAheadDisplay, typeAheadMapping ) {
		field.typeahead({
			source: typeAheadDisplay,
			items: 10,
			updater: function ( orgName ) {

				if ( !orgName ) return '';

				var id = typeAheadMapping[ orgName ];

				field.data('orgid', id);
				selectedOrg(id);
				return orgName;
			}
		});
		field.prop('disabled', false);
	}

	function setupAtoZ( data ) {

		// don't create list if it already exists
		if ( $('#atozList').length ) return;

		var $listNav = $('<div id="atozList-nav">'),
			$ul = $('<ul id="atozList">');

		_.forEach( data, function (value) {
			var $li = $('<li></li>'),
				$a = $('<a href="#" data-orgid="' + value.id + '">' + value.name + '</a>');

			$li.append($a);

			var s = value.city;
			if (value.stateProvince ) s += ', ' + value.stateProvince;

			var $spCityState = $('<span class="cityState">' + s + '</span>');

			$li.append($spCityState);

			$ul.append($li);
		});

		$ul.on( 'click', 'a', function ( event ) {

			event.preventDefault();

			var id = $( this ).data( 'orgid' ),
				name = $( this ).text();

			$( '#txtOrg' )
				.data( 'orgid', id )
				.val( name );

			selectedOrg(id);
			$('.modal-registration .close').trigger('click');
		});

		$('#atozModal .modal-body')
			.append($listNav)
			.append($ul);
		_target.find('#atozList').listnav({ initLetter: 'a', showCounts: false });
	}

	this.getOrg = function() {

		//only first one true for now
		var isDefault = 'true',
			domains = [];

		$('.txtDomain').each(function() {
			domains.push({ isDefault: isDefault, url: $(this).val() });
			isDefault = 'false';
		});

		var data;
		if ($('#txtOrg').is(':visible')) {
			data = { id : $('#txtOrg').data('orgid') };
		} else {

// #DN HACK HACK HACK HACK HACK		BEGIN
			var hack_Region = $('#selectRegion option:selected').text(),
				hack_State = $('#selectState option:selected').text();
			if ( hack_Region.indexOf('Select') === 0 ) hack_Region = '';
			if ( hack_State.indexOf('Select') === 0 ) hack_State = '';
// #DN HACK HACK HACK HACK HACK		END

			data = {
				type: $('#orgType').val(),
				typeOther: $('#txtTypeOther').val(),
				name: $('#orgName').val(),
				stateProvince: hack_State,
				county: hack_Region,
				country: $('#selectCountry option:selected').text(),
				address: '',
				addressContinued: '',
				city: '',
				postalCode: 0,
				phone: 0,
				fax: 0,
				email: 'test@test.com',
				website: domains,
				geoNameId: $('.location').last().val()
			};
		}
		return data;
	};

	this.validateOrg = function() {

		var isValid = true,
			orgMsg = '';

		if ($('.chooseOrg').is(':visible') && !$('#txtOrg').data('orgid')) {
			orgMsg += 'You must select an existing Organization or create a new one. <br>';
			isValid = false;

			if (orgMsg) {
				$('.existingOrganizationValidation').show().find('.msg').html(orgMsg);
				$('.existingOrganizationValidation').focus();
				$('html, body').animate({
					scrollTop: $('.existingOrganizationValidation').offset().top
				}, 0);
			} else {
				$('.existingOrganizationValidation').hide();
			}
		} else if ($('.newOrg').is(':visible')) {

			var errors = [];

			if (!$('#orgName').val()) {
				errors.push('Organization Name is a required field.');
			}

			if (!$('#orgType').val()) {
				errors.push('Organization Type is a required field.');
			}

			if ($('#orgType').val() === 'Other') {
				if (!$('#txtTypeOther').val()) {
					errors.push('If \'Other\' is chosen as the Organization Type, you must include a description.');
				}
			}

			if ($('#selectContinent').is(':visible') && !$('#selectContinent').val()) {
				errors.push('Continent is a required field.');
			}

			if ($('#selectCountry').is(':visible') && !$('#selectCountry').val()) {
				errors.push('Country is a required field.');
			}

			if ($('#selectState').is(':visible') && !$('#selectState').val()) {
				errors.push('State/Province is a required field.');
			}

			if ($('#selectRegion').is(':visible') && !$('#selectRegion').val()) {
				errors.push('Region is a required field.');
			}

			if ($('#selectCity').is(':visible') && !$('#selectCity').val()) {
				errors.push('City is a required field.');
			}

			var domainEntered = false;
			$('.txtDomain').each(function() {
				var domain = $(this).val();
				if (domain) {
					domainEntered = true;
					if (!validator.isFQDN(domain)) {
						errors.push('\'' + domain + '\' is not in a valid domain format.');
					}
				}
			});

			if (!domainEntered) errors.push('At least one Web Site Domain must be entered for the organization.');

			if (errors.length > 0) {
				orgMsg += errors.join('<br>');
				isValid = false;
			}

			if (orgMsg) {
				$('.newOrganizationValidation').show().find('.msg').html(orgMsg);
				$('.newOrganizationValidation').focus();
				$('html, body').animate({
					scrollTop: $('.newOrganizationValidation').offset().top
				}, 0);
			} else {
				$('.newOrganizationValidation').hide();
			}
		}

		return isValid;
	};

	main();

	return this;
};