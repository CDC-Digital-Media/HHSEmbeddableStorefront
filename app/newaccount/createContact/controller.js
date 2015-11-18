var TEMPLATE_MAPPING = require( '../../config/SETTINGS' ).TEMPLATE_MAPPING;

function Controller ( $scope, userService, createContactService ) {
	this.template = TEMPLATE_MAPPING.CREATE_CONTACT;
	
	// TEMP!
	// for development, remove!
	this.contact = { firstName: '', middleName: '', lastName: '' };

	$scope.$on( 'newAccountScreenChange', ( event, { form, next } ) => {			

		setTimeout(function(){$('#contactFirstName').focus();},1000);

		if ( form !== 'createContact' ) return;

		var userData = userService.getUserData(),
			{ firstName, middleName, lastName } = this.contact;

		if ( !this.form.$valid ) {
			this.form.showValidationMessages = true;
			return;
		}

		userData.user.firstName = firstName;
		userData.user.middleName = middleName;
		userData.user.lastName = lastName;
		userService.setUserData(userData);
		next();
	});
}

module.exports = Controller;