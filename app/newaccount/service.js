// #DN TODO
function transform( data ) {
	return data;
}

module.exports = function ( dataService ) {

	return {

		registerUser: function ( user ) {
			return dataService.registerUser( user ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		},
		updateUser: function ( user, id ) {
			return dataService.updateUser( user, id ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}

	};
};



/*
// create

var data = {
	firstName: $('#txtFirstName').val(),
	middleName: $('#txtMiddleName').val(),
	lastName: $('#txtLastName').val(),
	email: $('#txtEmail').val(),
	password: $('#txtPassword1').val(),
	passwordRepeat: $('#txtPassword2').val(),
	organizations: [_orgForm.getOrg()],
	agreedToUsageGuidelines: true
};

// load

syndicationLists: Array[1]

active: false
agreedToUsageGuidelines: true
email: "@email"
firstName: "Daniel"
id: "d9f0299b-d8fc-414a-ab8e-d44695607375"
lastName: "Nalborczyk"
middleName: ""
organizations: Array[1]
password: null
passwordRepeat: null





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



*/
